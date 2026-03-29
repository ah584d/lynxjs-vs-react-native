import { useCallback, useRef } from 'react';

/**
 * Custom hook that manages AbortController instances for cancelling async operations
 * @returns An object with abort function and current signal
 */
export function useAbortController() {
  const abortControllerRef = useRef<AbortController | null>(null);

  const abort = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
  }, []);

  const getSignal = useCallback((): AbortSignal => {
    // Abort any previous operation
    abort();

    // Create new AbortController
    abortControllerRef.current = new AbortController();
    return abortControllerRef.current.signal;
  }, [abort]);

  const cleanup = useCallback(() => {
    abort();
  }, [abort]);

  return {
    abort,
    getSignal,
    cleanup,
    get signal() {
      return abortControllerRef.current?.signal;
    },
  };
}
