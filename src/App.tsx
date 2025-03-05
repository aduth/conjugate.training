import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ActivityForm from './AcitivityForm';
import LatestActivities from './LatestActivities';
import TabPage from './TabPage';
import { Toaster } from '@/components/ui/sonner';
import logoURL from './assets/logo.svg';

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
    <div className="px-4">
      <header className="max-w-[800px] mx-auto my-5">
        <Link to="/latest">
          <img src={logoURL} width="200" height="61" alt="Home" />
        </Link>
      </header>
      <Tabs value={tabValue} onValueChange={setTabValue} className="max-w-[800px] mx-auto my-4">
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
  );
}

export default App;
