import { useEffect, useState } from "react";
import { ref, onValue, push } from "firebase/database";
import { useRouter } from "next/router";
import { database } from "../utils/firebase";
import LoggedIn from "../components/LoggedIn";
import WorkoutForm from "../components/WorkoutForm";
import { useAuth } from "../utils/authContext";
import styles from "./Dashboard.module.scss";
import useRoutines from "../queries/routines";

// TODO move this page under workouts?
export default function AddWorkout() {
  const { authUser, loading } = useAuth();
  const routines = useRoutines(authUser?.uid);
  const router = useRouter();
  const routineId = router.query.routineId ?? null;

  // TODO do we need a type for the workout?
  // TODO move this fn to queries/workouts?
  const submitWorkout = async (workout) => {
    const uid = authUser.uid;

    try {
      const workoutsRef = ref(database, `users/${uid}/workouts`);
      await push(workoutsRef, {
        date: workout.date,
        note: workout.note,
        id: workout.id,
        exercises: workout.exercises,
      });

      if (workout.saveAsRoutine) {
        console.log("saving as routine");
        const routinesRef = ref(database, `users/${uid}/routines`);
        await push(routinesRef, {
          exercises: workout.exercises,
          note: workout.note,
        });
      }
      router.push("/dashboard");
    } catch (error) {
      console.error(error);
    }
  };

  if (!loading && authUser) {
    return (
      <LoggedIn>
        <main className={styles.main}>
          <h2 className={styles.header}>Add Workout</h2>
          <WorkoutForm
            onLogWorkout={submitWorkout}
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
