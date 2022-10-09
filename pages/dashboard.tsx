import LoggedIn from "../components/LoggedIn";
import { useAuth } from "../utils/authContext";
import WorkoutBox from "../components/WorkoutBox";

import styles from "./Dashboard.module.scss";
import Link from "next/link";
import { useWorkouts } from "../utils/workoutContext";

// TODO include a Login Page
// TODO add the workouts and routines to the react context so we don't have to fetch them every time

export default function Dashboard() {
  const { authUser, loading } = useAuth();
  const { workouts, dispatch } = useWorkouts();

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
                <Link href={`/workouts/${w.backendId}`} key={w.backendId}>
                  <a>
                    <WorkoutBox showCheckbox={false} {...w} />
                  </a>
                </Link>
              ))}
          </>
        )}
      </main>
    </LoggedIn>
  );
}
