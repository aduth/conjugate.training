import { useState } from 'react';
import { db } from './db';

function ActivityForm() {
  const [exercise, setExercise] = useState('');
  const [weight, setWeight] = useState(0);

  async function addActivity() {
    await db.activities.add({
      exercise,
      reps: 1,
      weight,
      chainWeight: 0,
      bandType: null,
      createdAt: new Date(),
    });
  }

  return (
    <>
      Exercise:
      <input type="text" value={exercise} onChange={(event) => setExercise(event.target.value)} />
      Weight:
      <input
        type="number"
        value={weight}
        onChange={(event) => setWeight(Number(event.target.value))}
      />
      <button onClick={addActivity}>Add</button>
    </>
  );
}

export default ActivityForm;
