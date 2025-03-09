import { type ComponentType, type ReactNode } from 'react';
import { type LucideProps } from 'lucide-react';
import cn from '#lib/class-names.ts';

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
  const classes = cn('flex flex-col items-end justify-between', className);

  return (
    <dl className={classes}>
      <div className="divide-x divide-gray-300 flex text-right">{children}</div>
    </dl>
  );
}

function DetailsItem({ icon: IconComponent, name, className, children }: DetailsItemProps) {
  const classes = cn('px-4 first:pl-0 last:pr-0', className);
  return (
    <div className={classes}>
      <div className="inline-flex items-center text-sm text-base text-gray-700">
        <IconComponent size="16" className="inline-flex me-1" />
        <dt>{name}</dt>
      </div>
      <dd className="font-semibold whitespace-nowrap">{children}</dd>
    </div>
  );
}

export { Details, DetailsItem };
