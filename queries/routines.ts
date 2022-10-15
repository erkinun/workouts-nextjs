import { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { database } from "../utils/firebase";
// TODO move this into workout context
export default function useRoutines(uid: string) {
  const [routines, setRoutines] = useState([]);
  useEffect(() => {
    if (uid) {
      const routinesRef = ref(database, `users/${uid}/routines`);
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
  }, [uid]);

  return routines;
}
