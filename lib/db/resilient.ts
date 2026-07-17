const TRANSIENT_MARKERS = [
  "fetch failed",
  "ECONNRESET",
  "ETIMEDOUT",
  "EAI_AGAIN",
  "ENOTFOUND",
  "Connect Timeout",
  "UND_ERR_CONNECT_TIMEOUT",
  "Error connecting to database",
];

function collectMessage(error: unknown, depth = 0): string {
  if (!error || depth > 4) return "";
  if (error instanceof Error) {
    const cause = (error as Error & { cause?: unknown }).cause;
    return `${error.message} ${collectMessage(cause, depth + 1)}`;
  }
  return String(error);
}

function isTransient(error: unknown): boolean {
  const message = collectMessage(error);
  return TRANSIENT_MARKERS.some((marker) => message.includes(marker));
}

export async function withRetry<T>(
  operation: () => Promise<T>,
  { retries = 2, baseDelayMs = 250 }: { retries?: number; baseDelayMs?: number } = {}
): Promise<T> {
  let lastError: unknown;

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error;
      if (!isTransient(error) || attempt === retries) break;
      await new Promise((resolve) =>
        setTimeout(resolve, baseDelayMs * (attempt + 1))
      );
    }
  }

  throw lastError;
}

export async function safeQuery<T>(
  operation: () => Promise<T>,
  fallback: T,
  options?: { retries?: number; baseDelayMs?: number }
): Promise<T> {
  try {
    return await withRetry(operation, options);
  } catch (error) {
    console.error("[db] query failed, using fallback:", collectMessage(error));
    return fallback;
  }
}
