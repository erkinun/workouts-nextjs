import LoggedIn from "../components/LoggedIn";
import { ref, onValue } from "firebase/database";
import { database } from "../utils/firebase";
import { useAuth } from "../utils/authContext";
import { useEffect, useState } from "react";

import styles from "./Dashboard.module.scss";
import RoutineBox from "../components/RoutineBox";

export default function Routines() {
  const { authUser, loading } = useAuth();
  const [routines, setRoutines] = useState([]);

  useEffect(() => {
    if (authUser) {
      const routinesRef = ref(database, `users/${authUser.uid}/routines`);
      onValue(routinesRef, (snapshot) => {
        const routines: Array<any> = [];
        snapshot.forEach((child) => {
          routines.push({
            backendId: child.key,
            ...child.val(),
          });
        });
        setRoutines(routines);
      });
    }
  }, [authUser]);

  if (!loading && authUser) {
    return (
      <LoggedIn>
        <main className={styles.main}>
          <h2 className={styles.header}>
            {routines.length} Saved Routines ...
          </h2>
          {loading && <h1 className="title">Routines will be listed here</h1>}
          {!loading && routines.length > 0 && (
            <>
              {routines
                .sort((a, b) => {
                  const aNote = a.note.toLowerCase();
                  const bNote = b.note.toLowerCase();
                  return aNote > bNote ? 1 : bNote > aNote ? -1 : 0;
                })
                .map((r) => (
                  <RoutineBox key={r.backendId} {...r} />
                ))}
            </>
          )}
        </main>
      </LoggedIn>
    );
  } else {
    return <div>Loading...</div>;
  }
}
