import useDocumentState from '#hooks/use-document-state';
import cn from '#lib/class-names';
import { Skeleton } from './ui/skeleton';

type PageHeadingProps = React.ComponentProps<'h1'>;

function PageHeading({ children, ...props }: PageHeadingProps) {
  const classes = cn('text-2xl font-bold tracking-tight', props.className);
  const title = useDocumentState((state) => state.title);

  return (
    <h1 {...props} className={classes}>
      {children ?? title ?? <Skeleton className="h-[1lh] w-[300px]" aria-label="Loading" />}
    </h1>
  );
}

export default PageHeading;
