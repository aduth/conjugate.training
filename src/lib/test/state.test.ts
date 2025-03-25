import { describe, it, expect } from 'vitest';
import { create, resetAllStores } from '../state';

interface CountState {
  count: number;
  increment: () => void;
}

describe('state management', () => {
  it('should create a store and allow state updates', () => {
    const store = create<CountState>((set) => ({
      count: 0,
      increment: () => set((state) => ({ count: state.count + 1 })),
    }));

    expect(store.getState().count).toBe(0);
    store.getState().increment();
    expect(store.getState().count).toBe(1);
  });

  it('should reset all stores to their initial state', () => {
    const store = create<CountState>((set) => ({
      count: 0,
      increment: () => set((state) => ({ count: state.count + 1 })),
    }));

    store.getState().increment();
    expect(store.getState().count).toBe(1);

    resetAllStores();
    expect(store.getState().count).toBe(0);
  });
});
