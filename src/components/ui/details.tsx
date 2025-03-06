import { type ComponentType, type ReactNode } from 'react';
import { type LucideProps } from 'lucide-react';

interface DetailsProps {
  children: ReactNode;
}

interface DetailsItemProps {
  icon: ComponentType<LucideProps>;
  name: string;
  children: ReactNode;
}

function Details({ children }: DetailsProps) {
  return (
    <div className="flex flex-col items-end justify-between">
      <div className="divide-x divide-gray-300 flex text-right">{children}</div>
    </div>
  );
}

function DetailsItem({ icon: IconComponent, name, children }: DetailsItemProps) {
  return (
    <div className="px-4 first:pl-0 last:pr-0">
      <div className="flex items-center text-sm text-base text-gray-700">
        <IconComponent size="16" className="inline-flex me-1" />
        {name}
      </div>
      <div className="font-semibold">{children}</div>
    </div>
  );
}

export { Details, DetailsItem };
