import { type FormEvent, useState } from 'react';
import { type DXCAlert, type DXCInputField, resolveText } from 'dexie-cloud-addon';
import { useObservable } from 'dexie-react-hooks';
import { db } from '#db.ts';
import { Button } from './ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from './ui/alert';

const getAlertVariant = (alert: DXCAlert): 'destructive' | undefined =>
  alert.type === 'error' ? 'destructive' : undefined;

function SignInDialog() {
  const ui = useObservable(db.cloud.userInteraction);
  const [params, setParams] = useState<Record<string, string>>({});

  if (!ui) return null;

  const fields = Object.entries(ui.fields) as [string, DXCInputField][];
  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    ui!.onSubmit(params);
  }

  return (
    <Dialog open onOpenChange={(nextOpen) => !nextOpen && ui.onCancel()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Sign In</DialogTitle>
          <DialogDescription>
            Registration is currently closed. Enter your email address below if you have an account.
          </DialogDescription>
        </DialogHeader>
        {ui.alerts?.map((alert, i) => (
          <Alert key={i} variant={getAlertVariant(alert)}>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{resolveText(alert)}</AlertDescription>
          </Alert>
        ))}
        <form onSubmit={handleSubmit}>
          {fields.map(([fieldName, { type, label, placeholder }]) => (
            <div key={fieldName} className="space-y-2">
              <Label htmlFor={fieldName}>{label || (fieldName === 'email' && 'Email')}</Label>
              <Input
                autoFocus
                type={type}
                id={fieldName}
                placeholder={placeholder}
                value={params[fieldName] || ''}
                onChange={(event) => setParams({ ...params, [fieldName]: event.target.value })}
              />
            </div>
          ))}
        </form>
        <DialogFooter>
          <Button type="button" onClick={() => ui!.onSubmit(params)}>
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default SignInDialog;
