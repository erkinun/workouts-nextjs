import { useEffect, useState } from "react";
import { ref, onValue, set, push } from "firebase/database";
import { useRouter } from "next/router";
import { database } from "../utils/firebase";
import LoggedIn from "../components/LoggedIn";
import WorkoutForm from "../components/WorkoutForm";
import { useAuth } from "../utils/authContext";
import styles from "./Dashboard.module.scss";

export default function Add() {
  const { authUser, loading } = useAuth();
  const [routines, setRoutines] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (authUser) {
      const routinesRef = ref(database, `users/${authUser.uid}/routines`);
      onValue(routinesRef, (snapshot) => {
        const routines: Array<any> = [];
        snapshot.forEach((child) => {
          routines.push({
            // TODO do we need backendId? - we do for updates
            backendId: child.key,
            ...child.val(),
          });
        });
        setRoutines(routines);
      });
    }
  }, [authUser]);

  // TODO do we need a type for the workout?
  const submitWorkout = async (workout) => {
    console.log("submitting workout: ", workout);
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
          <WorkoutForm onLogWorkout={submitWorkout} routines={routines} />
        </main>
      </LoggedIn>
    );
  } else {
    return <div>Loading...</div>;
  }
}
