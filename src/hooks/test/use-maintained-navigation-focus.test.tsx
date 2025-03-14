import { renderHook, act } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { Router } from 'wouter';
import { memoryLocation } from 'wouter/memory-location';
import useMaintainedNavigateFocus from '../use-maintained-navigation-focus';

describe('useMaintainedNavigateFocus', () => {
  let fallbackElement: HTMLElement;

  beforeEach(() => {
    fallbackElement = document.createElement('button');
    document.body.appendChild(fallbackElement);
  });

  afterEach(() => {
    fallbackElement.remove();
  });

  it('should maintain focus on the active element if it is still connected after navigating', () => {
    const { hook, navigate } = memoryLocation({ path: '/' });

    renderHook(() => useMaintainedNavigateFocus(fallbackElement), {
      wrapper: ({ children }) => <Router hook={hook}>{children}</Router>,
    });

    const input = document.createElement('input');
    document.body.appendChild(input);

    act(() => {
      input.focus();
    });

    expect(document.activeElement).toBe(input);

    act(() => {
      navigate('/foo');
    });

    expect(document.activeElement).toBe(input);
  });

  it('should focus the fallback element active element is not connected after location changes', () => {
    const { hook, navigate } = memoryLocation({ path: '/' });

    renderHook(() => useMaintainedNavigateFocus(fallbackElement), {
      wrapper: ({ children }) => <Router hook={hook}>{children}</Router>,
    });

    const input = document.createElement('input');
    document.body.appendChild(input);

    act(() => {
      input.focus();
    });

    expect(document.activeElement).toBe(input);

    act(() => {
      input.remove();
      navigate('/foo');
    });

    expect(document.activeElement).toBe(fallbackElement);
  });
});
