import { useActionState, useState } from 'react';
import { useLocation } from 'wouter';
import { Pencil } from 'lucide-react';
import { toast } from 'sonner';
import { db } from '#db';
import { addCustomExercise } from '#entities/exercise';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { Input } from './ui/input';
import { Button } from './ui/button';

interface ExerciseRenameProps {
  name: string;
}

interface ExerciseRenameFormState {
  name: string;
}

async function rename(
  { name: previousName }: ExerciseRenameFormState,
  formData: FormData,
): Promise<ExerciseRenameFormState> {
  const name = formData.get('name') as string;

  await db.transaction('rw', db.exercises, db.activities, async () => {
    const activities = await db.activities.where({ exercise: previousName }).primaryKeys();
    const updates = activities.map((key) => ({ key, changes: { exercise: name } }));
    await db.activities.bulkUpdate(updates);
    await db.exercises.delete(previousName);
    await addCustomExercise(name);
  });

  return { name };
}

function ExerciseRename({ name }: ExerciseRenameProps) {
  const [isRenaming, setIsRenaming] = useState(false);
  const [, navigate] = useLocation();
  const [state, formAction] = useActionState(
    async (previousState: ExerciseRenameFormState, formData: FormData) => {
      setIsRenaming(false);
      const nextState = await rename(previousState, formData);
      navigate('/exercises/');
      toast.success('Exercise renamed successfully');
      return nextState;
    },
    { name },
  );

  if (isRenaming) {
    return (
      <form action={formAction} className="flex gap-2">
        <Input name="name" defaultValue={state.name} autoFocus />
        <Button type="submit">Save</Button>
      </form>
    );
  }

  return (
    <>
      {name}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger
            type="button"
            onClick={() => setIsRenaming(true)}
            className="p-2 -mr-2 text-gray-500 hover:text-red-400 cursor-pointer"
            aria-label={`Rename exercise: ${name}`}
          >
            <Pencil size="16" />
          </TooltipTrigger>
          <TooltipContent sideOffset={-10}>Rename</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </>
  );
}

export default ExerciseRename;
