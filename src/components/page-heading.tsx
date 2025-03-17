import useDocumentState from '#hooks/use-document-state.ts';
import cn from '#lib/class-names.ts';

type PageHeadingProps = React.ComponentProps<'h1'>;

function PageHeading({ children, ...props }: PageHeadingProps) {
  const classes = cn('text-2xl font-bold tracking-tight', props.className);
  const title = useDocumentState((state) => state.title);

  return (
    <h1 {...props} className={classes}>
      {children ?? title}
    </h1>
  );
}

export default PageHeading;
