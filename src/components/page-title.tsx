import { useEffect } from 'react';
import { filter, isTruthy } from 'remeda';
import useDocumentState from '#hooks/use-document-state';

interface PageTitleProps {
  children: string;
}

const BASE_TITLE = 'Conjugate Training';

function PageTitle({ children }: PageTitleProps) {
  const title = useDocumentState((state) => state.title);
  const setTitle = useDocumentState((state) => state.setTitle);
  const fullTitle = filter([BASE_TITLE, title], isTruthy).join(' - ');

  useEffect(() => {
    setTitle(children);
  }, [children, setTitle]);

  return <title>{fullTitle}</title>;
}

export default PageTitle;
