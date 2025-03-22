import { type ReactNode, useRef } from 'react';
import { Activity, CirclePlus, List } from 'lucide-react';
import { Link, useRoute } from 'wouter';
import useDocumentState from '#hooks/use-document-state';
import useMaintainedNavigateFocus from '#hooks/use-maintained-navigation-focus';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import TabPage from './tab-page';
import PageHeading from './page-heading';

interface PageProps {
  children: ReactNode;
}

function Page({ children }: PageProps) {
  const tabRef = useRef<HTMLDivElement>(null);
  const [, params] = useRoute('/:activeTab/*?');
  const title = useDocumentState((state) => state.title);
  const showHeading = useDocumentState((state) => state.showHeading);
  useMaintainedNavigateFocus(tabRef.current);
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
      <TabsContent ref={tabRef} value={activeTab} aria-labelledby={undefined} aria-label={title}>
        <TabPage>
          {showHeading && <PageHeading />}
          {children}
        </TabPage>
      </TabsContent>
    </Tabs>
  );
}

export default Page;
