import { type ReactNode } from 'react';

interface TwoColumnListItemColumnProps {
  children: ReactNode;
  className?: string;
}

interface TwoColumnListItemProps {
  children: ReactNode;
}

interface TwoColumnListProps {
  children: ReactNode;
}

function TwoColumnListItemColumn({ children, className }: TwoColumnListItemColumnProps) {
  return <div className={className}>{children}</div>;
}

function TwoColumnListItem({ children }: TwoColumnListItemProps) {
  return (
    <li className="py-3 sm:py-4">
      <div className="flex items-center flex-col space-y-4 md:space-y-0 md:flex-row md:space-x-4">
        {children}
      </div>
    </li>
  );
}

function TwoColumnList({ children }: TwoColumnListProps) {
  return <ul className="divide-y -my-4 divide-gray-200">{children}</ul>;
}

export { TwoColumnList, TwoColumnListItem, TwoColumnListItemColumn };
export default TwoColumnList;
