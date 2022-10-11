import Link from "next/link";
import { useRouter } from "next/router";
import WorkoutBox from "../../components/WorkoutBox";
import { useWorkouts } from "../../utils/workoutContext";

import styles from "./Workout.module.scss";
import buttonStyles from "../../components/Button.module.scss";
import { useAuth } from "../../utils/authContext";
import { deleteWorkout } from "../../queries/workouts";

export default function Workout() {
  const router = useRouter();
  const { authUser } = useAuth();
  const { workouts, } = useWorkouts();
  const { id } = router.query;

  const workout = workouts.find((workout) => workout.backendId === id);

  const saveRoutine = () => {
    throw new Error("not implemented yet");
  };

  const handleDelete = async () => {
    await deleteWorkout(authUser.uid, id.toString()); // id is not going to be an array
    router.push("/dashboard");
  };

  return (
    <div className={styles.contentContainer}>
      <div>
        <Link href={`/workouts/edit/${id}`}>
          <button className={buttonStyles.button}>Edit</button>
        </Link>
        <button className={buttonStyles.button} onClick={() => saveRoutine()}>
          Save for later
        </button>
      </div>
      <WorkoutBox showCheckbox={true} {...workout} />
      <button
        className={buttonStyles.deleteButton}
        onClick={() => handleDelete()}
      >
        Delete Workout
      </button>
    </div>
  );
}
