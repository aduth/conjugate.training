import { useMemo, useCallback } from 'react';
import { type Settings, db } from '#db';
import useCachedLiveQuery from './use-cached-live-query';

const DEFAULT_SETTINGS: Partial<Settings> = {
  unit: 'lbs',
};

type SetSettings = (nextSettings: Partial<Settings>) => void;

function useSettings(): [Omit<Settings, 'id'> | undefined, SetSettings] {
  const settingsArray = useCachedLiveQuery('settings', () => db.settings.toArray());
  const settings = useMemo(
    () => (settingsArray ? { ...DEFAULT_SETTINGS, ...settingsArray.at(-1) } : undefined),
    [settingsArray],
  );

  const setSettings = useCallback(
    (nextSettings: Partial<Settings>) => {
      if (settings?.id) {
        db.settings.update(settings.id, nextSettings);
      } else {
        db.settings.add(nextSettings);
      }
    },
    [settings],
  );

  return [settings, setSettings];
}

export default useSettings;
