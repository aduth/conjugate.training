import { type KeyboardEvent, useCallback, useRef, useState } from 'react';
import { X } from 'lucide-react';
import { Command as CommandPrimitive } from 'cmdk';
import cn from '#lib/class-names';
import { Badge } from './ui/badge';
import { Command, CommandGroup, CommandItem, CommandList } from './ui/command';

interface MultiSelectOption {
  value: string;

  label: string;
}

interface MultiSelectProps {
  options: MultiSelectOption[];

  label: string;

  placeholder?: string;

  value: string[];

  onValueChange: (nextValue: string[]) => void;
}

function MultiSelect({ options, label, placeholder, value, onValueChange }: MultiSelectProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const inputContainerClasses = cn(
    'group rounded-md border border-input shadow-xs py-1 md:py-2 px-3 focus-within:border-ring focus-within:ring-[3px] focus-within:ring-ring/50',
    !value.length && 'h-9',
  );

  const handleUnselect = useCallback(
    (unselectedIndex: number) => {
      const nextValue = value.filter((_item, index) => index !== unselectedIndex);
      onValueChange(nextValue);
      inputRef.current?.focus();
    },
    [value, onValueChange],
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      const { key } = event;
      if ((key === 'Delete' || key === 'Backspace') && !inputRef.current!.value) {
        const nextValue = value.slice(0, -1);
        onValueChange(nextValue);
      }
    },
    [value, onValueChange],
  );

  const selected = value
    .map((item) => options.find((option) => option.value === item))
    .filter(Boolean) as MultiSelectOption[];

  return (
    <Command onKeyDown={handleKeyDown} label={label} className="overflow-visible bg-transparent">
      <div className={inputContainerClasses}>
        <div className="flex flex-wrap gap-1 md:text-sm ">
          {selected.map((item, index) => {
            return (
              <Badge key={index} variant="secondary">
                {item.label}
                <button
                  type="button"
                  className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                      event.preventDefault();
                      event.stopPropagation();
                      handleUnselect(index);
                    }
                  }}
                  onClick={() => handleUnselect(index)}
                  aria-label="Remove"
                >
                  <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                </button>
              </Badge>
            );
          })}
          <CommandPrimitive.Input
            ref={inputRef}
            value={inputValue}
            onValueChange={setInputValue}
            onBlur={() => setIsOpen(false)}
            onFocus={() => setIsOpen(true)}
            className="flex-1 bg-transparent outline-none placeholder:text-muted-foreground placeholder:text-sm w-full"
            placeholder={placeholder}
          />
        </div>
      </div>
      <div className="relative mt-2">
        {isOpen && options.length > 0 && (
          <CommandList>
            <div className="absolute top-0 z-10 w-full rounded-md border bg-popover text-popover-foreground shadow-md outline-none">
              <CommandGroup className="h-full overflow-auto">
                {options.map((option) => {
                  return (
                    <CommandItem
                      key={option.value}
                      onMouseDown={(event) => event.preventDefault()}
                      onSelect={() => {
                        setInputValue('');
                        onValueChange([...value, option.value].sort());
                      }}
                      tabIndex={-1}
                    >
                      {option.label}
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </div>
          </CommandList>
        )}
      </div>
    </Command>
  );
}

export default MultiSelect;
