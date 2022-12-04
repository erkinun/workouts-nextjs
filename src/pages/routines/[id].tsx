import Link from 'next/link';
import { useRouter } from 'next/router';
import WorkoutBox from '../../components/WorkoutBox';
import styles from '../workouts/Workout.module.scss';
import buttonStyles from '../../components/Button.module.scss';
import { useAuth } from '../../utils/authContext';
import useRoutines, { deleteRoutine } from '../../queries/routines';

export default function AddRoutine() {
  const router = useRouter();
  const { authUser } = useAuth();
  const routines = useRoutines(authUser?.uid);
  const { id } = router.query;

  const routine = routines.find((routine) => routine.backendId === id);

  const handleDelete = async () => {
    await deleteRoutine(authUser.uid, id.toString()); // id is not going to be an array
    // TODO add a toast and then route to routines
    router.push('/routines');
  };

  return (
    <div className={styles.contentContainer}>
      <div>
        <Link href={`/routines/edit/${id}`}>
          <button className={buttonStyles.button}>Edit</button>
        </Link>
        <Link href={`/workouts/add?routineId=${id}`}>
          <button className={buttonStyles.button}>Use in workout</button>
        </Link>
      </div>
      <WorkoutBox showCheckbox={false} {...routine} />
      <button
        className={buttonStyles.deleteButton}
        onClick={async () => await handleDelete()}
      >
        Delete Routine
      </button>
    </div>
  );
}
