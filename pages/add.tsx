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
            // TODO do we need backendId?
            backendId: child.key,
            ...child.val(),
          });
        });
        setRoutines(routines);
      });
    }
  }, [authUser]);

  const submitWorkout = (workout) => {
    const uid = authUser.uid;

    console.log({ authUser });

    const workoutsRef = ref(database, `users/${uid}/workouts`);
    push(workoutsRef, {
      date: workout.date,
      note: workout.note,
      id: workout.id,
      exercises: workout.exercises,
    })
      .then(() => {
        console.log("Workout added!");
        router.push("/dashboard");
      })
      .catch((e) => {
        console.error(e);
      });
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
