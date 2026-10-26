
'use client';

import { useState } from 'react';
import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';

export default function Chat() {
  const [input, setInput] = useState('');

  const {
    messages,
    sendMessage,
    status,
    stop,
    error,
  } = useChat({
    transport: new DefaultChatTransport({
      api: '/api/chat',
    }),
  });

  const isThinking =
    status === 'submitted' || status === 'streaming';

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    const text = input.trim();

    if (!text || isThinking) return;

    setInput('');

    try {
      await sendMessage({ text });
    } catch (err) {
      console.error('CHAT ERROR:', err);
    }
  };

  return (
    <div className="mt-20 w-full rounded-2xl border border-forest/15 bg-white p-4 shadow-sm sm:p-6">
      <h2 className="font-display text-2xl italic text-forest">
        Ask Aura
      </h2>

      <p className="mt-2 text-sm text-forest/60">
        Ask us anything about our services.
      </p>

      <div className="mt-6 max-h-[450px] min-h-[200px] space-y-4 overflow-y-auto rounded-xl bg-cream p-3 sm:p-4">
        {messages.length === 0 && (
          <p className="text-sm text-forest/50">
            Start a conversation...
          </p>
        )}

        {messages.map((message) => (
          <div key={message.id} className="space-y-3">
            {message.parts.map((rawPart, index) => {
              const part = rawPart as any;

              // Display normal user and assistant text.
              if (part.type === 'text') {
                if (!part.text) return null;

                return (
                  <div
                    key={`${message.id}-text-${index}`}
                    className={
                      message.role === 'user'
                        ? 'ml-auto max-w-[90%] whitespace-pre-wrap break-words rounded-xl bg-forest px-4 py-3 text-sm text-white sm:max-w-[80%]'
                        : 'mr-auto max-w-[90%] whitespace-pre-wrap break-words rounded-xl bg-white px-4 py-3 text-sm text-forest shadow-sm sm:max-w-[80%]'
                    }
                  >
                    {part.text}
                  </div>
                );
              }

              // Ignore tools other than recommendService.
              if (part.type !== 'tool-recommendService') {
                return null;
              }

              const output = part.output;
              const isUnavailable =
                part.state === 'output-available' &&
                output?.available === false;

              return (
                <div
                  key={`${message.id}-tool-${index}`}
                  className="mr-auto w-full max-w-[90%] rounded-xl border border-forest/15 bg-white p-4 text-sm text-forest shadow-sm sm:max-w-[85%]"
                >
                  <p className="font-display text-lg italic">
                    {isUnavailable
                      ? 'Service Availability'
                      : 'Aura Service Recommendation'}
                  </p>

                  {part.state === 'input-streaming' && (
                    <div className="mt-3 rounded-lg bg-cream p-3">
                      <p className="font-medium">
                        Understanding your request...
                      </p>
                      <p className="mt-1 text-forest/60">
                        Aura is preparing the service recommendation.
                      </p>
                    </div>
                  )}

                  {part.state === 'input-available' && (
                    <div className="mt-3 rounded-lg border border-amber-300 bg-amber-50 p-3">
                      <p className="font-medium">
                        Checking service availability
                      </p>
                      <p className="mt-1">
                        Requested category:{' '}
                        {part.input?.category ?? 'Not provided'}
                      </p>
                      <p className="mt-1 text-forest/60">
                        Checking Aura’s available services...
                      </p>
                    </div>
                  )}

                  {part.state === 'output-available' &&
                    output?.available === true && (
                      <div className="mt-3 rounded-lg border border-forest/15 bg-cream p-4">
                        <p className="text-xs uppercase tracking-wider text-forest/60">
                          Recommended service
                        </p>

                        <h3 className="mt-2 font-display text-xl">
                          {output.serviceName}
                        </h3>

                        <p className="mt-2 leading-6">
                          {output.description}
                        </p>

                        <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-forest/10 pt-3">
                          <span className="rounded-full bg-white px-3 py-1 text-xs capitalize">
                            {output.category}
                          </span>

                          <span className="text-xs text-forest/70">
                            Duration: {output.duration}
                          </span>
                        </div>
                      </div>
                    )}

                  {isUnavailable && (
                    <div
                      role="alert"
                      className="mt-3 rounded-lg border border-red-300 bg-red-50 p-3 text-red-800"
                    >
                      <p className="font-medium">
                        This service is currently unavailable.
                      </p>
                      <p className="mt-1">
                        {output.message ||
                          'We could not find this service in our current list.'}
                      </p>
                    </div>
                  )}

                  {part.state === 'output-error' && (
                    <div
                      role="alert"
                      className="mt-3 rounded-lg border border-red-300 bg-red-50 p-3 text-red-800"
                    >
                      <p className="font-medium">
                        We couldn’t complete this recommendation.
                      </p>
                      <p className="mt-1">
                        {part.errorText ||
                          'Something went wrong. Please try again.'}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}

        {isThinking && (
          <div className="flex items-center gap-2 text-sm text-forest/50">
            <span>Aura is thinking</span>
            <span className="animate-pulse">...</span>
          </div>
        )}
      </div>

      {error && (
        <div
          role="alert"
          className="mt-3 rounded-xl bg-clay/10 px-4 py-3 text-sm text-forest"
        >
          Something went wrong. Please try again.
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="mt-4 flex flex-col gap-3 sm:flex-row"
      >
        <input
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="Ask about our services..."
          disabled={isThinking}
          className="min-w-0 flex-1 rounded-xl border border-forest/15 bg-white px-4 py-3 text-sm outline-none focus:border-forest disabled:opacity-60"
        />

        {isThinking ? (
          <button
            type="button"
            onClick={stop}
            className="w-full rounded-xl bg-clay px-5 py-3 text-sm text-white sm:w-auto"
          >
            Stop
          </button>
        ) : (
          <button
            type="submit"
            disabled={!input.trim()}
            className="w-full rounded-xl bg-forest px-5 py-3 text-sm text-white disabled:opacity-50 sm:w-auto"
          >
            Send
          </button>
        )}
      </form>
    </div>
  );
}
