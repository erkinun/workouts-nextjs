import ExercisesList from "./ExercisesList";
import dayjs from "dayjs";
import { Workout } from "../utils/types";

import styles from "./Workout.module.scss";

const WorkoutBox = ({
  note,
  date,
  exercises,
  showCheckbox = false,
}: WorkoutEntry.Props) => {
  return (
    <div className={styles.workout}>
      <div className={styles.header}>
        <div className="note">{note}</div>
        <div className="date">{dayjs(date).format("DD/MM/YYYY")}</div>
      </div>
      <ExercisesList showCheckBox={showCheckbox} exercises={exercises} />
    </div>
  );
};

export namespace WorkoutEntry {
  export type Props = Workout & {
    showCheckbox: Boolean;
  };
}

export default WorkoutBox;
