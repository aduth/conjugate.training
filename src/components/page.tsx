import { type ReactNode } from 'react';
import { Link, useRoute } from 'wouter';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import TabPage from './tab-page';
import { Activity, CirclePlus, List } from 'lucide-react';

interface PageProps {
  children: ReactNode;
}

function Page({ children }: PageProps) {
  const [, params] = useRoute('/:activeTab/*?');
  const { activeTab = '' } = params ?? {};

  return (
    <Tabs value={activeTab} className="my-4" activationMode="manual">
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
          <TabsTrigger asChild value="activities">
            <Link to="/activities/new">
              <CirclePlus /> Add New
            </Link>
          </TabsTrigger>
        </TabsList>
      </div>
      <TabsContent value={activeTab}>
        <TabPage>{children}</TabPage>
      </TabsContent>
    </Tabs>
  );
}

export default Page;
