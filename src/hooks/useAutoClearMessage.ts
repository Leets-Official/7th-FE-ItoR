import { useEffect } from 'react';

interface UseAutoClearMessageOptions {
  delay?: number;
}

export function useAutoClearMessage(
  message: string | null,
  onClear: () => void,
  options: UseAutoClearMessageOptions = {},
) {
  const { delay = 2000 } = options;

  useEffect(() => {
    if (!message) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      onClear();
    }, delay);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [delay, message, onClear]);
}
