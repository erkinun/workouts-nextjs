import Link from 'next/link';
import { useRouter } from 'next/router';
import WorkoutBox from '../../components/WorkoutBox';
import { useWorkouts } from '../../utils/workoutContext';

import styles from './Workout.module.scss';
import buttonStyles from '../../components/Button.module.scss';
import { useAuth } from '../../utils/authContext';
import {
  deleteWorkout,
  submitWorkout,
  updateWorkout,
} from '../../queries/workouts';
import { saveRoutine } from '../../queries/routines';

export default function Workout() {
  const router = useRouter();
  const { authUser } = useAuth();
  const { workouts } = useWorkouts();
  const { id } = router.query;

  const workout = workouts.find((workout) => workout.backendId === id);

  const handleSaveRoutine = async () => {
    await saveRoutine(authUser.uid, workout);
    // TODO do some kind of toasting and then route to dashboard
    router.push('/dashboard');
  };

  const handleRepeatWorkout = async () => {
    await submitWorkout(
      authUser.uid,
      {
        ...workout,
        date: new Date().toString(),
      },
      router,
    );
  };

  const markExerciseAsDone = async (exerciseName: string, done: boolean) => {
    const exercises = workout.exercises.map((exercise) => {
      if (exercise.name === exerciseName) {
        exercise.completed = done;
      }
      return exercise;
    });
    await updateWorkout(authUser.uid, {
      ...workout,
      exercises,
    });
  };

  const handleDelete = async () => {
    await deleteWorkout(authUser.uid, id.toString()); // id is not going to be an array
    router.push('/dashboard');
  };

  return (
    <div className={styles.contentContainer}>
      <div>
        <Link href={`/workouts/edit/${id}`}>
          <button className={buttonStyles.button}>Edit</button>
        </Link>
        <button
          className={buttonStyles.button}
          onClick={async () => await handleSaveRoutine()}
        >
          Save for later
        </button>
        <button className={buttonStyles.button} onClick={handleRepeatWorkout}>
          Repeat workout
        </button>
      </div>
      <WorkoutBox
        markExerciseAsDone={markExerciseAsDone}
        showCheckbox={true}
        {...workout}
      />
      <button
        className={buttonStyles.deleteButton}
        onClick={async () => await handleDelete()}
      >
        Delete Workout
      </button>
    </div>
  );
}
