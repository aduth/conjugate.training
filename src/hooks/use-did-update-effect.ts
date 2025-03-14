import { useEffect, useRef } from 'react';

function useDidUpdateEffect(callback: () => void, dependencies: any[]) {
  const hasMounted = useRef(false);

  useEffect(() => {
    if (hasMounted.current) {
      callback();
    } else {
      hasMounted.current = true;
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);
}

export default useDidUpdateEffect;
