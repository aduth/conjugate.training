import { useState, useEffect } from 'react';

export function useMediaQuery(query: string) {
  const [isMatch, setIsMatch] = useState(false);

  useEffect(() => {
    function onChange(event: MediaQueryListEvent) {
      setIsMatch(event.matches);
    }

    const result = matchMedia(query);
    result.addEventListener('change', onChange);
    setIsMatch(result.matches);

    return () => result.removeEventListener('change', onChange);
  }, [query]);

  return isMatch;
}
