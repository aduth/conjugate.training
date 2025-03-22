import { type ComponentType, type ReactNode } from 'react';
import { type LucideProps } from 'lucide-react';
import cn from '#lib/class-names';

interface DetailsProps {
  children: ReactNode;
  className?: string;
}

interface DetailsItemProps {
  icon: ComponentType<LucideProps>;
  name: string;
  className?: string;
  children: ReactNode;
}

function Details({ children, className }: DetailsProps) {
  const classes = cn('flex flex-col', className);

  return (
    <div className={classes}>
      <dl className="grid grid-flow-col grid-rows-2 auto-cols-max text-right *:px-4 [&>*:nth-child(-n+2)]:pl-0 [&>*:nth-last-child(-n+2)]:pr-0 [&>*:nth-last-child(-n+2)]:border-r-0">
        {children}
      </dl>
    </div>
  );
}

function DetailsItem({ icon: IconComponent, name, className, children }: DetailsItemProps) {
  const dtClasses = cn(
    'inline-flex items-center justify-self-end text-sm text-base text-gray-700 border-r-1 border-gray-300',
    className,
  );
  const ddClasses = cn(
    'font-semibold justify-self-end whitespace-nowrap border-r-1 border-gray-300',
    className,
  );

  return (
    <>
      <dt className={dtClasses}>
        <IconComponent size="16" className="inline-flex me-1" />
        {name}
      </dt>
      <dd className={ddClasses}>{children}</dd>
    </>
  );
}

export { Details, DetailsItem };
