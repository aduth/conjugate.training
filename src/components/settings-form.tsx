import { useEffect, useRef } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { toast } from 'sonner';
import useSettings from '#hooks/use-settings.ts';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from './ui/form';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Button } from './ui/button';

const formSchema = z.object({
  unit: z.enum(['lbs', 'kgs']),
  maxRepFormula: z.enum(['brzycki', 'epley']),
  estimateFrom: z.enum(['best', 'latest']),
});

type FormSchema = z.infer<typeof formSchema>;

function SettingsForm() {
  const initialized = useRef<boolean>(false);
  const [settings, setSettings] = useSettings();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      unit: 'lbs' as const,
      maxRepFormula: 'brzycki' as const,
      estimateFrom: 'best' as const,
    },
  });

  useEffect(() => {
    if (!settings || initialized.current) return;
    initialized.current = true;
    form.reset(settings);
  }, [settings, form]);

  async function onSubmit(nextSettings: FormSchema) {
    await setSettings(nextSettings);
    toast.success('Settings saved successfully');
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="unit"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel className="font-bold">Unit</FormLabel>
              <FormControl>
                <RadioGroup
                  value={field.value}
                  onValueChange={field.onChange}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-y-0">
                    <FormControl>
                      <RadioGroupItem value="lbs" />
                    </FormControl>
                    <FormLabel className="font-normal">lbs</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-y-0">
                    <FormControl>
                      <RadioGroupItem value="kgs" />
                    </FormControl>
                    <FormLabel className="font-normal">kgs</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="maxRepFormula"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel className="font-bold">1RM Formula</FormLabel>
              <FormControl>
                <RadioGroup
                  value={field.value}
                  onValueChange={field.onChange}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-y-0">
                    <FormControl>
                      <RadioGroupItem value="brzycki" />
                    </FormControl>
                    <FormLabel className="font-normal">Brzycki</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-y-0">
                    <FormControl>
                      <RadioGroupItem value="epley" />
                    </FormControl>
                    <FormLabel className="font-normal">Epley</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="estimateFrom"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel className="font-bold">Estimate Based On</FormLabel>
              <FormControl>
                <RadioGroup
                  value={field.value}
                  onValueChange={field.onChange}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-y-0">
                    <FormControl>
                      <RadioGroupItem value="best" />
                    </FormControl>
                    <FormLabel className="font-normal">Best Activity</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-y-0">
                    <FormControl>
                      <RadioGroupItem value="latest" />
                    </FormControl>
                    <FormLabel className="font-normal">Latest Activity</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Save</Button>
      </form>
    </Form>
  );
}

export default SettingsForm;
