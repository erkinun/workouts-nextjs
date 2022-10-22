import LoggedIn from "../components/LoggedIn";
import { useAuth } from "../utils/authContext";
import WorkoutBox from "../components/WorkoutBox";

import styles from "./Dashboard.module.scss";
import Link from "next/link";
import { useWorkouts } from "../utils/workoutContext";

export default function Dashboard() {
  const { loading } = useAuth();
  const { workouts } = useWorkouts();

  // TODO add a loading spinner

  return (
    <LoggedIn>
      <main className={styles.main}>
        <h2 className={styles.header}>{workouts.length} Workouts so far ...</h2>
        {loading && <h1 className="title">Workouts will be listed here</h1>}
        {!loading && workouts.length > 0 && (
          <ul>
            {workouts
              .sort(
                (a, b) =>
                  new Date(b.date).getTime() - new Date(a.date).getTime()
              )
              .map((w) => (
                <li>
                  <Link href={`/workouts/${w.backendId}`} key={w.backendId}>
                    <a>
                      <WorkoutBox showCheckbox={false} {...w} />
                    </a>
                  </Link>
                </li>
              ))}
          </ul>
        )}
      </main>
    </LoggedIn>
  );
}
