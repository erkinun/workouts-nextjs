import dayjs from "dayjs";
import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Exercise } from "../utils/types";
import ExerciseGroup from "./ExerciseGroup";

import styles from "./WorkoutForm.module.scss";

type Inputs = {
  backendId: string;
  date: string;
  routineId: string;
  exercises: Array<Exercise>;
  note: string;
  saveAsRoutine: boolean;
};
// TODO make the border radius match throughout the form
export default function WorkoutForm({
  routines = [],
  onLogWorkout,
  workout = null,
}) {
  const { register, handleSubmit, watch, control, reset } = useForm<Inputs>({
    defaultValues: workout ?? {},
  });

  const watchRoutineId = watch("routineId");

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const workout = { ...data, id: self.crypto.randomUUID() };
    onLogWorkout(workout);
  };

  useEffect(() => {
    if (watchRoutineId) {
      const selectedRoutine = routines.find(
        (r) => r.backendId === watchRoutineId
      );
      console.log({ selectedRoutine, watchRoutineId });
      reset({
        exercises: selectedRoutine?.exercises ?? [],
      });
    }
  }, [watchRoutineId]);

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      {
        // TODO use the current time of the day with date
      }
      <input type="hidden" name="backendId" {...register("backendId")} />
      <input
        type="date"
        defaultValue={dayjs(workout?.date ?? Date.now()).format("YYYY-MM-DD")}
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
      <ExerciseGroup register={register} control={control} />
      <textarea
        placeholder="notes about workout"
        className="textarea-input"
        defaultValue={workout?.note}
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
