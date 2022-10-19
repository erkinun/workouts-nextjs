import { useEffect, useState } from "react";
import { ref, onValue, update, push } from "firebase/database";
import { database } from "../utils/firebase";
import { Routine } from "../utils/types";
// TODO move reading routines into workout context so we don't call it every time
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

export const updateRoutine = async (uid: string, routine: Routine) => {
  try {
    const workoutsRef = ref(
      database,
      `users/${uid}/routines/${routine.backendId}`
    );
    await update(workoutsRef, {
      note: routine.note,
      exercises: routine.exercises,
    });
  } catch (error) {
    console.error(error);
  }
};

export const saveRoutine = async (uid: string, routine: Routine) => {
  try {
    const routinesRef = ref(database, `users/${uid}/routines`);
    await push(routinesRef, {
      exercises: routine.exercises,
      note: routine.note,
    });
  } catch (error) {
    console.error(error);
  }
};
