import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import useDidUpdateEffect from './use-did-update-effect';

function useMaintainedNavigateFocus(fallbackElement: HTMLElement | null) {
  const [location] = useLocation();
  const [focusedElement, setFocusedElement] = useState<Element | null>(null);

  useEffect(() => {
    const handleFocus = (event: FocusEvent) => setFocusedElement(event.target as Element);
    window.addEventListener('focus', handleFocus, true);
    return () => {
      window.removeEventListener('focus', handleFocus, true);
    };
  }, []);
  useDidUpdateEffect(() => {
    if (focusedElement && !focusedElement.isConnected) {
      fallbackElement?.focus();
    }
  }, [location]);
}

export default useMaintainedNavigateFocus;
