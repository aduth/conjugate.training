import { type ReactNode } from 'react';
import { Card } from '@/components/ui/card';

interface TabPageProps {
  children?: ReactNode;
}

function TabPage({ children }: TabPageProps) {
  return <Card className="p-6">{children}</Card>;
}

export default TabPage;
