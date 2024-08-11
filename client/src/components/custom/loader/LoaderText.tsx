import { EMAIL_LOADER_TEXT } from '@/lib/constants';
import { useEffect, useState } from 'react';

interface LoaderTextProps {
  isLoading: boolean;
}

const LoaderText = ({ isLoading }: LoaderTextProps) => {
  const randomInitialIndex = Math.floor(
    Math.random() * EMAIL_LOADER_TEXT.length,
  );
  const [loaderText, setLoaderText] = useState(
    EMAIL_LOADER_TEXT[randomInitialIndex],
  );

  useEffect(() => {
    if (isLoading) {
      const intervalId = setInterval(() => {
        const randomIndex = Math.floor(
          Math.random() * EMAIL_LOADER_TEXT.length,
        );
        setLoaderText(EMAIL_LOADER_TEXT[randomIndex]);
      }, 1000);

      return () => clearInterval(intervalId);
    } else {
      setLoaderText('');
    }
  }, [isLoading]);

  return <>{loaderText}</>;
};

export default LoaderText;
