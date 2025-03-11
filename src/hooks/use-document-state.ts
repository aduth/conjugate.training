import { create } from 'zustand';

interface DocumentState {
  title: string;

  setTitle: (title: string) => void;
}

const useDocumentState = create<DocumentState>((set) => ({
  title: '',
  setTitle: (title: string) => set(() => ({ title })),
}));

export default useDocumentState;
