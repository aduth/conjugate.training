import { create } from '#lib/state';

interface DocumentState {
  title: string | null;

  showHeading: boolean;

  setTitle: (title: string | null, options?: Partial<DocumentState>) => void;
}

const useDocumentState = create<DocumentState>((set) => ({
  title: null,
  showHeading: true,
  setTitle: (title, options) => set(() => ({ title, ...options })),
}));

export default useDocumentState;
