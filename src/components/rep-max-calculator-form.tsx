import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { getEstimatedWeight } from '#lib/estimator';
import useSettings from '#hooks/use-settings';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { Input } from './ui/input';
import FormattedWeight from './formatted-weight';

const formSchema = z.object({
  sourceWeight: z.number().min(0).default(0),
  sourceReps: z.number().min(1).default(1),
  targetPercentage: z.number().min(0).max(100).default(100),
  targetReps: z.number().min(1).default(1),
});

type FormSchema = z.infer<typeof formSchema>;

function RepMaxCalculatorForm() {
  const [settings] = useSettings();
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      sourceWeight: 0,
      sourceReps: 1,
      targetPercentage: 100,
      targetReps: 1,
    },
  });

  const [sourceWeight, sourceReps, targetPercentage, targetReps] = form.watch([
    'sourceWeight',
    'sourceReps',
    'targetPercentage',
    'targetReps',
  ]);

  const result = getEstimatedWeight(
    targetReps,
    { weight: sourceWeight, reps: sourceReps },
    settings?.maxRepFormula,
  );

  return (
    <Form {...form}>
      <form className="space-y-6">
        <div className="flex space-x-2">
          <div className="flex-1">
            <FormField
              control={form.control}
              name="sourceWeight"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Source Weight</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      inputMode="numeric"
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
              name="sourceReps"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Source Reps</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      min={1}
                      inputMode="numeric"
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
              name="targetPercentage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Target Percentage</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      inputMode="numeric"
                      min={0}
                      max={100}
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
              name="targetReps"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Target Reps</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      min={1}
                      inputMode="numeric"
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
        <div role="status">
          {sourceWeight > 0 && result && (
            <>
              <strong>Result:</strong> <FormattedWeight value={result * (targetPercentage / 100)} />
            </>
          )}
        </div>
      </form>
    </Form>
  );
}

export default RepMaxCalculatorForm;
