import { useRouter } from "next/router";

import styles from "../Dashboard.module.scss";
import { useAuth } from "../../utils/authContext";
import useRoutines, { saveRoutine } from "../../queries/routines";
import LoggedIn from "../../components/LoggedIn";
import WorkoutForm from "../../components/WorkoutForm";
import { Routine } from "../../utils/types";

export default function EditRoutine() {
  const { authUser, loading } = useAuth();
  const routines = useRoutines(authUser?.uid);
  const router = useRouter();

  const submitRoutine = async (routine: Routine) => {
    await saveRoutine(authUser.uid, routine);
    router.push("/routines");
  };

  if (!loading && authUser) {
    return (
      <LoggedIn>
        <main className={styles.main}>
          <h2 className={styles.header}>Add Routine</h2>
          <WorkoutForm
            onLogWorkout={submitRoutine}
            routines={routines}
            routineMode={true}
          />
        </main>
      </LoggedIn>
    );
  } else {
    return <div>Loading...</div>;
  }
}
