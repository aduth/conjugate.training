import { create } from 'zustand';

interface DocumentState {
  title: string;

  showHeading: boolean;

  setTitle: (title: string, options?: Partial<DocumentState>) => void;
}

const useDocumentState = create<DocumentState>((set) => ({
  title: '',
  showHeading: true,
  setTitle: (title, options) => set(() => ({ title, ...options })),
}));

export default useDocumentState;
