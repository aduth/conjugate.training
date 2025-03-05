import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ActivityForm from './AcitivityForm';
import LatestActivities from './LatestActivities';
import TabPage from './TabPage';
import { Toaster } from '@/components/ui/sonner';

function App() {
  return (
    <>
      <Tabs defaultValue="latest" className="w-[600px] mx-auto my-4">
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
