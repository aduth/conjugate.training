import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useLocation } from 'wouter';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { History } from 'lucide-react';
import { useLiveQuery } from 'dexie-react-hooks';
import { isShallowEqual } from 'remeda';
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
import { addCustomExercise, getExerciseSlug } from '#entities/exercise';
import { ExerciseSelect } from './exercise-select';
import ExerciseInfo from './exercise-info';
import { useEffect, useState } from 'react';
import DatePicker from './date-picker';

const formSchema = z.object({
  exercise: z.string().min(1, 'You must make a selection'),
  reps: z.number().min(0).default(0),
  weight: z.number().min(0).default(0),
  chainWeight: z.number().min(0).default(0),
  bandType: z.string().nullable().default(null),
  createdAt: z.date().default(() => new Date()),
});

type FormSchema = z.infer<typeof formSchema>;

interface ActivityFormProps {
  entity?: Activity;
}

function ActivityForm({ entity }: ActivityFormProps) {
  const [, navigate] = useLocation();
  const [historyState, setHistoryState] = useState<{ activityForm?: FormSchema }>({});
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: history.state?.activityForm ?? {
      exercise: '',
      bandType: null,
      weight: 0,
      chainWeight: 0,
      reps: 1,
      createdAt: new Date(),
    },
  });
  const [exercise, reps, chainWeight, bandType, weight, createdAt] = form.watch([
    'exercise',
    'reps',
    'chainWeight',
    'bandType',
    'weight',
    'createdAt',
  ]);
  const historyCount = useLiveQuery<number | null>(
    () => (exercise ? db.activities.where({ exercise }).count() : null),
    [exercise],
  );

  useEffect(() => {
    if (entity) form.reset(entity);
  }, [entity, form]);
  useEffect(() => {
    const nextState = { exercise, reps, chainWeight, bandType, weight, createdAt };
    if (!isShallowEqual(history.state?.activityForm, nextState)) {
      setHistoryState({ activityForm: nextState });
    }
  }, [exercise, reps, chainWeight, bandType, weight, createdAt]);
  useEffect(() => {
    if (historyState) history.replaceState(historyState, '');
  }, [historyState]);

  async function onDestroy() {
    await db.activities.delete(entity!.id);
    toast.success('Activity deleted successfully');
    navigate('/latest');
  }

  async function onSubmit(activity: z.infer<typeof formSchema>) {
    addCustomExercise(activity.exercise);

    if (entity) {
      await db.activities.update(entity.id, activity);
      navigate('/latest');
    } else {
      form.reset();
      await db.activities.add(activity);
    }

    toast.success('Activity saved successfully');
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex items-end space-x-2">
          <div className="basis-full">
            <FormField
              control={form.control}
              name="exercise"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="exercise">Exercise</FormLabel>
                  <FormControl>
                    <ExerciseSelect
                      {...field}
                      id="exercise"
                      onChange={(nextExercise) => {
                        field.onChange(nextExercise);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {!!historyCount && (
            <Button variant="outline" className="font-normal" asChild>
              <Link to={`/exercises/${getExerciseSlug(exercise)}`} state={historyState}>
                <History /> History ({historyCount})
              </Link>
            </Button>
          )}
        </div>
        <div className="flex space-x-2">
          <div className="flex-1">
            <FormField
              control={form.control}
              name="bandType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="band-type">Band Type</FormLabel>
                  <FormControl>
                    <Select
                      {...field}
                      key={field.value}
                      value={field.value || 'none'}
                      onValueChange={(nextValue) =>
                        field.onChange(nextValue === 'none' ? null : nextValue)
                      }
                    >
                      <SelectTrigger className="w-full" aria-label="Band Type" id="band-type">
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
                      type="tel"
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
                      inputMode="numeric"
                      pattern="[0-9]*"
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
                      type="tel"
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
                  <FormLabel htmlFor="date">Date</FormLabel>
                  <FormControl>
                    <DatePicker id="date" value={field.value} onChange={field.onChange} />
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
