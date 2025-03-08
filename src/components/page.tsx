import { type ReactNode } from 'react';
import { Link } from 'wouter';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import TabPage from './tab-page';
import { Activity, CirclePlus, List } from 'lucide-react';

interface PageProps {
  tabValue: string;
  children: ReactNode;
}

function Page({ tabValue, children }: PageProps) {
  return (
    <Tabs value={tabValue} className="my-4">
      <div className="mx-4 md:mx-0">
        <TabsList className="grid w-full grid-cols-3 h-auto *:py-2">
          <TabsTrigger asChild value="latest">
            <Link to="/latest">
              <List /> Latest
            </Link>
          </TabsTrigger>
          <TabsTrigger asChild value="exercises">
            <Link to="/exercises">
              <Activity /> Exercises
            </Link>
          </TabsTrigger>
          <TabsTrigger asChild value="add">
            <Link to="/add">
              <CirclePlus /> Add New
            </Link>
          </TabsTrigger>
        </TabsList>
      </div>
      <TabsContent value={tabValue}>
        <TabPage>{children}</TabPage>
      </TabsContent>
    </Tabs>
  );
}

export default Page;
