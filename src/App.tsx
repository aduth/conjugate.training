import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ActivityForm from './AcitivityForm';
import LatestActivities from './LatestActivities';

function App() {
  return (
    <Tabs defaultValue="latest" className="w-[600px] mx-auto my-4">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="latest">Latest</TabsTrigger>
        <TabsTrigger value="exercises">Exercises</TabsTrigger>
        <TabsTrigger value="add">Add New</TabsTrigger>
      </TabsList>
      <TabsContent value="latest">
        <Card>
          <LatestActivities />
        </Card>
      </TabsContent>
      <TabsContent value="exercises">
        <Card></Card>
      </TabsContent>
      <TabsContent value="add">
        <Card className="p-6">
          <ActivityForm />
        </Card>
      </TabsContent>
    </Tabs>
  );
}

export default App;
