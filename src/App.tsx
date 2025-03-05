import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ActivityForm from './AcitivityForm';
import LatestActivities from './LatestActivities';
import TabPage from './TabPage';
import { Toaster } from '@/components/ui/sonner';

function App() {
  const [location, navigate] = useLocation();
  const [tabValue, setTabValue] = useState(location.split('/')[1]);
  useEffect(() => {
    if (tabValue) {
      const url = new URL('/', window.location.href);
      url.pathname = tabValue;
      navigate(url.pathname);
    } else {
      setTabValue('latest');
    }
  }, [tabValue, navigate]);

  return (
    <>
      <Tabs value={tabValue} onValueChange={setTabValue} className="w-[600px] mx-auto my-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="latest">Latest</TabsTrigger>
          <TabsTrigger value="exercises">Exercises</TabsTrigger>
          <TabsTrigger value="add">Add New</TabsTrigger>
        </TabsList>
        <TabsContent value="latest">
          <TabPage>
            <LatestActivities />
          </TabPage>
        </TabsContent>
        <TabsContent value="exercises">
          <TabPage></TabPage>
        </TabsContent>
        <TabsContent value="add">
          <TabPage>
            <ActivityForm />
          </TabPage>
        </TabsContent>
      </Tabs>
      <Toaster />
    </>
  );
}

export default App;
