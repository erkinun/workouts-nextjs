import { push, ref, remove, update } from "firebase/database";
import { database } from "../utils/firebase";
import { Workout } from "../utils/types";

// TODO maybe use react query? or maybe just in react context

export const deleteWorkout = async (uid: string, workoutId: string) => {
  try {
    const workoutRef = ref(database, `users/${uid}/workouts/${workoutId}`);
    await remove(workoutRef);
  } catch (error) {
    console.error(error);
  }
};

export const updateWorkout = async (uid: string, workout: Workout) => {
  try {
    const workoutsRef = ref(
      database,
      `users/${uid}/workouts/${workout.backendId}`
    );
    await update(workoutsRef, {
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
  } catch (error) {
    console.error(error);
  }
};
