'use client';

import { useEffect, useRef, useState } from 'react';

type Message = {
  id: number;
  role: 'user' | 'assistant';
  text: string;
};

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [isAtBottom, setIsAtBottom] = useState(true);
  const [error, setError] = useState(false);

  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (!isAtBottom) return;

    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth',
    });
  }, [messages, isThinking, isAtBottom]);

  const handleScroll = () => {
    const container = messagesContainerRef.current;

    if (!container) return;

    const distanceFromBottom =
      container.scrollHeight -
      container.scrollTop -
      container.clientHeight;

    setIsAtBottom(distanceFromBottom < 40);
  };

  const scrollToLatest = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth',
    });

    setIsAtBottom(true);
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const text = input.trim();

    if (!text || isThinking) return;

    setError(false);

    const userMessage: Message = {
      id: Date.now(),
      role: 'user',
      text,
    };

    const assistantMessage: Message = {
      id: Date.now() + 1,
      role: 'assistant',
      text: '',
    };

    setMessages((current) => [
      ...current,
      userMessage,
      assistantMessage,
    ]);

    setInput('');
    setIsThinking(true);
    setIsAtBottom(true);

    const controller = new AbortController();

    abortControllerRef.current = controller;

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [
            ...messages,
            {
              role: 'user',
              parts: [
                {
                  type: 'text',
                  text,
                },
              ],
            },
          ],
        }),
        signal: controller.signal,
      });

      if (!response.ok) {
        throw new Error('Something went wrong.');
      }

      if (!response.body) {
        throw new Error('No response stream available.');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      let accumulatedText = '';

      while (true) {
        const { value, done } = await reader.read();

        if (done) break;

        const chunk = decoder.decode(value, {
          stream: true,
        });

        accumulatedText += chunk;

        setMessages((current) =>
          current.map((message) =>
            message.id === assistantMessage.id
              ? {
                  ...message,
                  text: accumulatedText,
                }
              : message
          )
        );
      }

      const finalChunk = decoder.decode();

      if (finalChunk) {
        accumulatedText += finalChunk;

        setMessages((current) =>
          current.map((message) =>
            message.id === assistantMessage.id
              ? {
                  ...message,
                  text: accumulatedText,
                }
              : message
          )
        );
      }
    } catch (error) {
      if (
        error instanceof DOMException &&
        error.name === 'AbortError'
      ) {
        return;
      }

      console.error('CHAT ERROR:', error);

      setError(true);

      setMessages((current) =>
        current.map((message) =>
          message.id === assistantMessage.id
            ? {
                ...message,
                text: 'Sorry, something went wrong. Please try again.',
              }
            : message
        )
      );
    } finally {
      setIsThinking(false);
      abortControllerRef.current = null;
    }
  };

  const handleStop = () => {
    abortControllerRef.current?.abort();
  };

  const handleRetry = () => {
    setError(false);
  };

  return (
    <div className="mt-20 w-full rounded-2xl border border-forest/15 bg-white p-4 shadow-sm sm:p-6">
      <h2 className="font-display text-2xl italic text-forest">
        Ask Aura
      </h2>

      <p className="mt-2 text-sm text-forest/60">
        Ask us anything about our services.
      </p>

      <div className="relative mt-6">
        <div
          ref={messagesContainerRef}
          onScroll={handleScroll}
          className="max-h-[400px] min-h-[200px] space-y-4 overflow-y-auto rounded-xl bg-cream p-3 sm:p-4"
        >
          {messages.length === 0 && !isThinking && (
            <p className="text-sm text-forest/50">
              Start a conversation...
            </p>
          )}

          {messages.map((message) => (
            <div
              key={message.id}
              className={
                message.role === 'user'
                  ? 'ml-auto max-w-[90%] break-words rounded-xl bg-forest px-4 py-3 text-sm text-white sm:max-w-[80%]'
                  : 'mr-auto max-w-[90%] break-words rounded-xl bg-white px-4 py-3 text-sm text-forest shadow-sm sm:max-w-[80%]'
              }
            >
              {message.text}
            </div>
          ))}

          {isThinking && (
            <div className="flex items-center gap-2 text-sm text-forest/50">
              <span>Generating</span>

              <span className="flex gap-1">
                <span className="animate-pulse">.</span>
                <span className="animate-pulse [animation-delay:150ms]">
                  .
                </span>
                <span className="animate-pulse [animation-delay:300ms]">
                  .
                </span>
              </span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {!isAtBottom && (
          <button
            type="button"
            onClick={scrollToLatest}
            className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-forest px-4 py-2 text-xs text-white shadow-md"
          >
            ↓ Jump to latest
          </button>
        )}
      </div>

      {error && (
        <div className="mt-3 flex items-center justify-between gap-3 rounded-xl bg-clay/10 px-4 py-3 text-sm text-forest">
          <span>
            Something went wrong. Please try again.
          </span>

          <button
            type="button"
            onClick={handleRetry}
            className="shrink-0 underline"
          >
            Dismiss
          </button>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="mt-4 flex flex-col gap-3 sm:flex-row"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about our services..."
          disabled={isThinking}
          className="min-w-0 flex-1 rounded-xl border border-forest/15 bg-white px-4 py-3 text-sm outline-none focus:border-forest disabled:opacity-60"
        />

        {isThinking ? (
          <button
            type="button"
            onClick={handleStop}
            className="w-full rounded-xl bg-clay px-5 py-3 text-sm text-white sm:w-auto"
          >
            Stop
          </button>
        ) : (
          <button
            type="submit"
            className="w-full rounded-xl bg-forest px-5 py-3 text-sm text-white sm:w-auto"
          >
            Send
          </button>
        )}
      </form>
    </div>
  );
}