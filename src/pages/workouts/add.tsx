import { useRouter } from 'next/router';
import LoggedIn from '../../components/LoggedIn';
import WorkoutForm from '../../components/WorkoutForm';
import { useAuth } from '../../utils/authContext';
import styles from '../Dashboard.module.scss';
import useRoutines from '../../queries/routines';
import { Workout } from '../../utils/types';
import { submitWorkout } from '../../queries/workouts';

export default function AddWorkout() {
  const { authUser, loading } = useAuth();
  const routines = useRoutines(authUser?.uid);
  const router = useRouter();
  const routineId = router.query.routineId ?? null;

  if (!loading && authUser) {
    return (
      <LoggedIn>
        <main className={styles.main}>
          <h2 className={styles.header}>Add Workout</h2>
          <WorkoutForm
            onLogWorkout={async (workout: Workout) =>
              await submitWorkout(authUser.uid, workout, router)
            }
            routines={routines}
            selectedRoutine={routineId}
          />
        </main>
      </LoggedIn>
    );
  } else {
    return <div>Loading...</div>;
  }
}
