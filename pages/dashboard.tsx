import LoggedIn from "../components/LoggedIn";
import { ref, onValue } from "firebase/database";
import { database } from "../utils/firebase";
import { useAuth } from "../utils/authContext";
import { useEffect, useState } from "react";
import WorkoutBox from "../components/WorkoutBox";

import styles from "./Dashboard.module.scss";

// TODO include a Login Page
// TODO add the workouts and routines to the react context so we don't have to fetch them every time

export default function Dashboard() {
  const { authUser, loading } = useAuth();
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    if (authUser) {
      const workoutsRef = ref(database, `users/${authUser.uid}/workouts`);
      onValue(workoutsRef, (snapshot) => {
        const workouts: Array<any> = [];
        snapshot.forEach((child) => {
          // uncomment if you need to see the workout data
          // console.log({ workout: child.val() });
          workouts.push({
            backendId: child.key,
            ...child.val(),
          });
        });
        setWorkouts(workouts);
      });
    }
  }, [authUser]);

  // TODO find unique keys in workouts to fix the warning
  // TODO add a loading spinner
  // TODO add a link to workout details page
  return (
    <LoggedIn>
      <main className={styles.main}>
        <h2 className={styles.header}>{workouts.length} Workouts so far ...</h2>
        {loading && <h1 className="title">Workouts will be listed here</h1>}
        {!loading && workouts.length > 0 && (
          <>
            {workouts
              .sort(
                (a, b) =>
                  new Date(b.date).getTime() - new Date(a.date).getTime()
              )
              .map((w) => (
                <WorkoutBox showCheckbox={false} key={w.date} {...w} />
              ))}
          </>
        )}
      </main>
    </LoggedIn>
  );
}
