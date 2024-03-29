import { useRouter } from 'next/router';
import LoggedIn from '../../../components/LoggedIn';
import WorkoutForm from '../../../components/WorkoutForm';
import useRoutines from '../../../queries/routines';
import { updateWorkout } from '../../../queries/workouts';
import { useAuth } from '../../../utils/authContext';
import { useWorkouts } from '../../../utils/workoutContext';

import styles from '../../Dashboard.module.scss';
import { useState } from 'react';

// TODO doesn't populate the stupid exercises for some reason when reloaded
export default function EditWorkout() {
  const { authUser, loading } = useAuth();
  const { workouts } = useWorkouts();
  const routines = useRoutines(authUser?.uid);
  const router = useRouter();
  const { id } = router.query;
  const workout = workouts.find((workout) => workout.backendId === id);

  const [saved, setSaved] = useState(false);

  const submitWorkout = async (workout) => {
    await updateWorkout(authUser.uid, workout);
    setSaved(true);
    router.push('/dashboard');
  };

  if (!loading && authUser) {
    return (
      <LoggedIn>
        <main className={styles.main}>
          <h2 className={styles.header}>Edit Workout {saved && ' - Saved'}</h2>
          <WorkoutForm
            onLogWorkout={submitWorkout}
            workout={workout}
            routines={routines}
          />
        </main>
      </LoggedIn>
    );
  } else {
    return <div>Loading...</div>;
  }
}
