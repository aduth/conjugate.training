import { zodResolver } from '@hookform/resolvers/zod';
import { useLocation } from 'wouter';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '#components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '#components/ui/select';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '#components/ui/form';
import { Input } from '#components/ui/input';
import { type Activity, db } from '#db';
import { addCustomExercise } from '#entities/exercise';
import { ExerciseSelect } from './exercise-select';
import ExerciseInfo from './exercise-info';
import { useEffect } from 'react';
import DatePicker from './date-picker';

const formSchema = z.object({
  exercise: z.string().min(1, 'You must make a selection'),
  reps: z.number().min(0).default(0),
  weight: z.number().min(0).default(0),
  chainWeight: z.number().min(0).default(0),
  bandType: z.string().nullable().default(null),
  createdAt: z.date().default(() => new Date()),
});

interface ActivityFormProps {
  entity?: Activity;
}

function ActivityForm({ entity }: ActivityFormProps) {
  const [, navigate] = useLocation();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      exercise: '',
      bandType: null,
      weight: 0,
      chainWeight: 0,
      reps: 1,
      createdAt: new Date(),
    },
  });
  const [exercise, reps, chainWeight, bandType] = form.watch([
    'exercise',
    'reps',
    'chainWeight',
    'bandType',
  ]);

  useEffect(() => {
    if (entity) form.reset(entity);
  }, [entity, form]);

  async function onDestroy() {
    await db.activities.delete(entity!.id);
    toast.success('Activity deleted successfully');
    navigate('/latest');
  }

  async function onSubmit(activity: z.infer<typeof formSchema>) {
    if (entity) {
      await db.activities.update(entity.id, activity);
      navigate('/latest');
    } else {
      form.reset();
      addCustomExercise(activity.exercise);
      await db.activities.add(activity);
    }

    toast.success('Activity saved successfully');
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="exercise"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Exercise</FormLabel>
              <FormControl>
                <ExerciseSelect
                  {...field}
                  onChange={(nextExercise) => {
                    field.onChange(nextExercise);
                  }}
                />
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
                        <SelectItem value="Monster Mini">Monster Mini Band</SelectItem>
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
                      onFocus={(event) => event.target.select()}
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
                      onFocus={(event) => event.target.select()}
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
                      onFocus={(event) => event.target.select()}
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
              name="createdAt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date</FormLabel>
                  <FormControl>
                    <DatePicker value={field.value} onChange={field.onChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex-1"></div>
        </div>
        {exercise && (
          <ExerciseInfo name={exercise} reps={reps} chainWeight={chainWeight} bandType={bandType} />
        )}
        <div className="space-y-2">
          <Button type="submit" className="w-full">
            {entity ? 'Update' : 'Submit'}
          </Button>
          {entity && (
            <Button type="button" variant="destructive" className="w-full" onClick={onDestroy}>
              Delete
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
}

export default ActivityForm;
