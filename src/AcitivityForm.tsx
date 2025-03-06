import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { db } from './db';
import { ExerciseSelect } from './ExerciseSelect';
import { addCustomExercise } from './entities/exercise';

const formSchema = z.object({
  exercise: z.string().min(1),
  reps: z.number().min(0).default(0),
  weight: z.number().min(0).default(0),
  chainWeight: z.number().min(0).default(0),
  bandType: z.string().nullable().default(null),
  createdAt: z.date().default(() => new Date()),
});

function ActivityForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      exercise: '',
      bandType: null,
      weight: 0,
      chainWeight: 0,
      reps: 1,
    },
  });

  async function onSubmit(activity: z.infer<typeof formSchema>) {
    form.reset();
    addCustomExercise(activity.exercise);
    await db.activities.add(activity);
    toast.success('Activity saved successfully');
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="exercise"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Exercise</FormLabel>
              <FormControl>
                <ExerciseSelect {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex space-x-2">
          <div className="flex-1">
            <FormField
              control={form.control}
              name="bandType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Band Type</FormLabel>
                  <FormControl>
                    <Select value={field.value || 'none'} onValueChange={field.onChange}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="None" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">None</SelectItem>
                        <SelectItem value="Micro">Micro Band</SelectItem>
                        <SelectItem value="Mini">Mini Band</SelectItem>
                        <SelectItem value="Moster Mini">Monster Mini Band</SelectItem>
                        <SelectItem value="Light">Light Band</SelectItem>
                        <SelectItem value="Average">Average Band</SelectItem>
                        <SelectItem value="Strong">Strong Band</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex-1">
            <FormField
              control={form.control}
              name="chainWeight"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Chain Weight</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      onChange={(event) => field.onChange(Number(event.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="flex space-x-2">
          <div className="flex-1">
            <FormField
              control={form.control}
              name="reps"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Reps</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      onChange={(event) => field.onChange(Number(event.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex-1">
            <FormField
              control={form.control}
              name="weight"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Weight</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      onChange={(event) => field.onChange(Number(event.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

export default ActivityForm;
