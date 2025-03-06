import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ActivityForm from './AcitivityForm';
import LatestActivities from './LatestActivities';
import TabPage from './TabPage';
import { Toaster } from '@/components/ui/sonner';

function App() {
  const [location, navigate] = useLocation();
  const [tabValue, setTabValue] = useState('');
  useEffect(() => {
    setTabValue(location.split('/')[1] || 'latest');
  }, [location]);
  useEffect(() => {
    if (tabValue) {
      const url = new URL('/', window.location.href);
      url.pathname = tabValue;
      navigate(url.pathname);
    }
  }, [tabValue, navigate]);

  return (
    <div className="relative py-5 h-full">
      <div className="absolute bg-white inset-x-0 top-0 h-40"></div>
      <div className="relative max-w-[600px] mx-auto px-4">
        <header className="mb-5">
          <Link to="/latest">
            <img src="/images/logo.svg" width="200" height="61" alt="Home" />
          </Link>
        </header>
        <Tabs value={tabValue} onValueChange={setTabValue} className="my-4">
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
      </div>
    </div>
  );
}

export default App;
