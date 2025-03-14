import { describe, it, expect, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import useDidUpdateEffect from '../use-did-update-effect';

describe('useDidUpdateEffect', () => {
  it('should not call the callback on initial render', () => {
    const callback = vi.fn();
    renderHook(() => useDidUpdateEffect(callback, []));

    expect(callback).not.toHaveBeenCalled();
  });

  it('should call the callback when dependencies change', () => {
    const callback = vi.fn();
    let dependency = 0;
    const { rerender } = renderHook(() => useDidUpdateEffect(callback, [dependency]));

    dependency = 1;
    rerender();
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('should not call the callback if dependencies do not change', () => {
    const callback = vi.fn();
    const { rerender } = renderHook(() => useDidUpdateEffect(callback, [1]));

    rerender();
    expect(callback).not.toHaveBeenCalled();
  });
});
