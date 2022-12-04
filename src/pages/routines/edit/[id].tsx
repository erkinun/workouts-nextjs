import { useRouter } from "next/router";

import styles from "../../Dashboard.module.scss";
import { useAuth } from "../../../utils/authContext";
import useRoutines, { updateRoutine } from "../../../queries/routines";
import LoggedIn from "../../../components/LoggedIn";
import WorkoutForm from "../../../components/WorkoutForm";

export default function EditRoutine() {
  const { authUser, loading } = useAuth();
  const routines = useRoutines(authUser?.uid);
  const router = useRouter();
  const { id } = router.query;
  const routine = routines.find((routine) => routine.backendId === id);

  const submitRoutine = async (routine) => {
    await updateRoutine(authUser.uid, routine);
    router.push("/routines");
  };

  if (!loading && authUser) {
    return (
      <LoggedIn>
        <main className={styles.main}>
          <h2 className={styles.header}>Edit Routine</h2>
          <WorkoutForm
            onLogWorkout={submitRoutine}
            workout={routine}
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
