import { type StateCreator, create as baseCreate } from 'zustand';

const resetters = new Set<() => void>();

export const resetAllStores = () => {
  resetters.forEach((reset) => reset());
};

export const create = (<T>(stateCreator: StateCreator<T>) => {
  const store = baseCreate(stateCreator);
  resetters.add(() => store.setState(store.getInitialState(), true));
  return store;
}) as typeof baseCreate;
