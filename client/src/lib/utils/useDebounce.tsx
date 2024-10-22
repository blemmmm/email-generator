import { useEffect, useState } from 'react';

export const useDebounce = async (delay: number, text: string) => {
  const [debounceValue, setDebounceValue] = useState(text);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceValue(debounceValue);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [text, delay]);
  return debounceValue;
};
