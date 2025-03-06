import { useEffect, useState } from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';
import cn from '@/lib/class-names';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import useExerciseData from '../hooks/use-exercise-data';

interface ExerciseSelectProps {
  value?: string;

  onChange: (nextValue: string) => void;
}

export function ExerciseSelect({ value, onChange }: ExerciseSelectProps) {
  const [query, setQuery] = useState('');
  const exercises = useExerciseData(query);
  const [open, setOpen] = useState(false);
  const hasExactMatch = exercises.some(
    (exercise) => exercise.toLowerCase() === query.toLowerCase(),
  );
  useEffect(() => {
    if (!open) setQuery('');
  }, [open]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className="justify-between">
          {value ? value : 'Select exercise...'}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0 w-[var(--radix-popover-trigger-width)]">
        <Command filter={() => 1}>
          <CommandInput
            placeholder="Search exercise..."
            onInput={(event) => setQuery((event.target as HTMLInputElement).value)}
          />
          <CommandList>
            <CommandEmpty>No exercise found.</CommandEmpty>
            <CommandGroup>
              {!hasExactMatch && query.length > 0 && (
                <CommandItem
                  key="add-new"
                  value={query}
                  onSelect={() => {
                    onChange(query);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn('mr-2 h-4 w-4', value === query ? 'opacity-100' : 'opacity-0')}
                  />
                  Add new “{query}”…
                </CommandItem>
              )}
              {exercises.map((exercise) => (
                <CommandItem
                  key={exercise}
                  value={exercise}
                  onSelect={() => {
                    onChange(exercise);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn('mr-2 h-4 w-4', value === exercise ? 'opacity-100' : 'opacity-0')}
                  />
                  {exercise}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
