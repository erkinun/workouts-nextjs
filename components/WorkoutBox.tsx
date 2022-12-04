import ExercisesList from "./ExercisesList";
import dayjs from "dayjs";
import { Workout } from "../utils/types";

import styles from "./Workout.module.scss";

// TODO make the design more aligned center
const WorkoutBox = ({
  note,
  date,
  exercises,
  showCheckbox = false,
  markExerciseAsDone
}: WorkoutEntry.Props) => {
  return (
    <div className={styles.workout}>
      <div className={styles.header}>
        <div className={styles.note}><i className="fa-solid fa-dumbbell"></i> {note}</div>
        <div className={styles.date}>{dayjs(date).format("DD/MM/YYYY")}</div>
      </div>
      <ExercisesList markExerciseAsDone={markExerciseAsDone} showCheckBox={showCheckbox} exercises={exercises} />
    </div>
  );
};

export namespace WorkoutEntry {
  export type Props = Workout & {
    showCheckbox: Boolean;
    markExerciseAsDone?: (exerciseName: string, done: boolean) => void;
  };
}

export default WorkoutBox;
