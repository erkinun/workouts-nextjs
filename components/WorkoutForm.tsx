import dayjs from "dayjs";
import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Exercise } from "../utils/types";
import ExerciseGroup from "./ExerciseGroup";

import styles from "./WorkoutForm.module.scss";

type Inputs = {
  date: string;
  routineId: string;
  exercises: Array<Exercise>;
  note: string;
  saveAsRoutine: boolean;
};
// TODO make the border radius match throughout the form
export default function WorkoutForm({ routines = [], onLogWorkout }) {
  const { register, handleSubmit, watch } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log("SUBMITTING");
    const workout = { ...data, id: self.crypto.randomUUID(), exercises };
    console.log(workout);
    onLogWorkout(workout);
  };

  const watchRoutineId = watch("routineId");

  const [exercises, setExercises] = useState<Array<Exercise>>([]);

  useEffect(() => {
    setExercises(
      routines.find((r) => r.backendId === watchRoutineId)?.exercises ?? []
    );
  }, [watchRoutineId]);

  const fooSubmit = (e) => {
    console.log("SUBMITTING SDHIT");

    // handleSubmit(onSubmit);
    // TODO broken add workout with routines
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <input
        type="date"
        value={dayjs().format("YYYY-MM-DD")}
        {...register("date")}
      />
      <label htmlFor="routines">Pick a routine</label>
      <select
        name="routines"
        className={styles.routineSelect}
        {...register("routineId")}
      >
        <option></option>
        {routines.map((r) => (
          <option key={r.backendId} value={r.backendId}>
            {r.note}
          </option>
        ))}
      </select>

      {/* {watchRoutineId && console.log(routines)} */}
      <ExerciseGroup
        exercises={exercises}
        deleteExercise={(idToDelete) => {
          setExercises(exercises.filter(({ id }) => id !== idToDelete));
        }}
        addExercise={() =>
          setExercises(
            exercises.concat([
              {
                name: "",
                weight: "",
                effort: "",
                typeOfTraining: "",
                id: uuidv4(),
              },
            ])
          )
        }
      />
      <textarea
        placeholder="notes about workout"
        className="textarea-input"
        {...register("note", { required: true })}
      />

      <section>
        <label htmlFor="saveAsRoutine">
          Save as a routine{" "}
          <input
            type="checkbox"
            name="saveAsRoutine"
            {...register("saveAsRoutine")}
          />
        </label>
      </section>

      <div>
        <button type="submit" className="button">
          Save Workout
        </button>
      </div>
    </form>
  );
}
