import Link from "next/link";
import { useRouter } from "next/router";
import { ref, onValue, set, push, remove } from "firebase/database";
import { database } from "../../utils/firebase";
import WorkoutBox from "../../components/WorkoutBox";
import { useWorkouts } from "../../utils/workoutContext";

import styles from "./Workout.module.scss";
import buttonStyles from "../../components/Button.module.scss";
import { useAuth } from "../../utils/authContext";

export default function Workout() {
  const router = useRouter();
  const { authUser } = useAuth();
  const { workouts, dispatch } = useWorkouts();
  const { id } = router.query;

  const workout = workouts.find((workout) => workout.backendId === id);

  const saveRoutine = () => {
    throw new Error("not implemented yet");
  };
  // TODO carry these calls into queries subfolder
  const deleteWorkout = async () => {
    try {
      const workoutRef = ref(database, `users/${authUser.uid}/workouts/${id}`);
      await remove(workoutRef);
      router.push("/dashboard");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.contentContainer}>
      <div>
        <Link href={`/edit/${id}`}>
          <button className={buttonStyles.button}>Edit</button>
        </Link>
        <button className={buttonStyles.button} onClick={() => saveRoutine()}>
          Save for later
        </button>
      </div>
      <WorkoutBox showCheckbox={true} {...workout} />
      <button
        className={buttonStyles.deleteButton}
        onClick={() => deleteWorkout()}
      >
        Delete Workout
      </button>
    </div>
  );
}
