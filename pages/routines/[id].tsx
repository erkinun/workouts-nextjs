import Link from "next/link";
import { useRouter } from "next/router";
import WorkoutBox from "../../components/WorkoutBox";

import styles from "../workouts/Workout.module.scss";
import buttonStyles from "../../components/Button.module.scss";
import { useAuth } from "../../utils/authContext";
import { deleteWorkout } from "../../queries/workouts";
import useRoutines from "../../queries/routines";

export default function AddRoutine() {
  const router = useRouter();
  const { authUser } = useAuth();
  const routines = useRoutines(authUser?.uid);
  const { id } = router.query;

  const routine = routines.find((routine) => routine.backendId === id);

  const handleDelete = async () => {
    // TODO implement delete routine
    // await deleteRoutine(authUser.uid, id.toString()); // id is not going to be an array
    router.push("/routines");
  };

  return (
    <div className={styles.contentContainer}>
      <div>
        <Link href={`/routines/edit/${id}`}>
          <button className={buttonStyles.button}>Edit</button>
        </Link>
        <Link href={`/add?routineId=${id}`}>
          <button className={buttonStyles.button}>Use in workout</button>
        </Link>
      </div>
      <WorkoutBox showCheckbox={false} {...routine} />
      <button
        className={buttonStyles.deleteButton}
        onClick={() => handleDelete()}
      >
        Delete Routine
      </button>
    </div>
  );
}
