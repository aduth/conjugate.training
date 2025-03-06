import { type ReactNode } from 'react';
import { useLocation } from 'wouter';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import TabPage from './tab-page';
import { Activity, CirclePlus, List } from 'lucide-react';

interface PageProps {
  tabValue: string;
  children: ReactNode;
}

function Page({ tabValue, children }: PageProps) {
  const [, navigate] = useLocation();

  function setTabValue(nextTabValue: string) {
    const url = new URL('/', window.location.href);
    url.pathname = nextTabValue;
    navigate(url.pathname);
  }

  return (
    <Tabs value={tabValue} onValueChange={setTabValue} className="my-4">
      <TabsList className="grid w-full grid-cols-3 h-auto *:py-2">
        <TabsTrigger value="latest">
          <List /> Latest
        </TabsTrigger>
        <TabsTrigger value="exercises">
          <Activity /> Exercises
        </TabsTrigger>
        <TabsTrigger value="add">
          <CirclePlus /> Add New
        </TabsTrigger>
      </TabsList>
      <TabsContent value={tabValue}>
        <TabPage>{children}</TabPage>
      </TabsContent>
    </Tabs>
  );
}

export default Page;
