import { useEffect, useState } from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import cn from '#lib/class-names';
import { Button } from '#components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '#components/ui/command';
import { Drawer, DrawerContent, DrawerTrigger } from '#/components/ui/drawer';
import { Popover, PopoverContent, PopoverTrigger } from '#components/ui/popover';
import useExerciseData from '#hooks/use-exercise-data';
import { useMediaQuery } from '#hooks/use-media-query.ts';
import { DialogDescription, DialogTitle } from './ui/dialog';

interface ExerciseSelectProps {
  id?: string;

  value?: string;

  onChange: (nextValue: string) => void;
}

interface ExerciseSelectListProps {
  isOpen: boolean;

  value?: string;

  onChange: (nextValue: string) => void;

  onClose: () => void;
}

function ExerciseSelectList({ isOpen, value, onChange, onClose }: ExerciseSelectListProps) {
  const [query, setQuery] = useState('');
  const exercises = useExerciseData(query);
  useEffect(() => {
    if (!isOpen && value) setQuery(value);
  }, [isOpen, value]);
  const hasExactMatch = exercises.some(
    (exercise) => exercise.name.toLowerCase() === query.toLowerCase(),
  );

  return (
    <Command label="Search exercise" filter={() => 1}>
      <CommandInput
        value={query}
        placeholder="Search exercise..."
        autoFocus
        onInput={(event) => setQuery((event.target as HTMLInputElement).value)}
        className="text-md"
      />
      <CommandList className="max-h-none md:max-h-[300px]">
        <CommandEmpty>No exercise found.</CommandEmpty>
        <CommandGroup>
          {!hasExactMatch && query.length > 0 && (
            <CommandItem
              key="add-new"
              value={query}
              onSelect={() => {
                onChange(query);
                onClose();
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
              key={exercise.slug}
              value={exercise.name}
              onSelect={() => {
                onChange(exercise.name);
                onClose();
              }}
            >
              <Check
                className={cn(
                  'mr-2 h-4 w-4',
                  value === exercise.name ? 'opacity-100' : 'opacity-0',
                )}
              />
              {exercise.name}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}

export function ExerciseSelect({ id, value, onChange }: ExerciseSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const isDesktop = useMediaQuery('(min-width: 768px)');

  if (isDesktop) {
    return (
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            id={id}
            variant="outline"
            role="combobox"
            aria-expanded={isOpen}
            aria-label="Select exercise"
            className="justify-between"
          >
            {value ? value : 'Select exercise…'}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0 w-[var(--radix-popover-trigger-width)]">
          <ExerciseSelectList
            isOpen={isOpen}
            value={value}
            onChange={onChange}
            onClose={() => setIsOpen(false)}
          />
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline" className="justify-between" aria-label="Select exercise">
          {value ? value : 'Select exercise…'}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <VisuallyHidden>
          <DialogTitle>Select exercise</DialogTitle>
          <DialogDescription>Search or select an exercise</DialogDescription>
        </VisuallyHidden>
        <div className="mt-4 border-t h-[30svh]">
          <ExerciseSelectList
            isOpen={isOpen}
            value={value}
            onChange={onChange}
            onClose={() => setIsOpen(false)}
          />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
