interface PageTitleProps {
  children: string;
}

function PageTitle({ children }: PageTitleProps) {
  const title = `Conjugate Training - ${children}`;

  return <title>{title}</title>;
}

export default PageTitle;
