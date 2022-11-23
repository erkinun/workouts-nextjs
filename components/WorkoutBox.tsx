import ExercisesList from "./ExercisesList";
import dayjs from "dayjs";
import { Workout } from "../utils/types";

import styles from "./Workout.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDumbbell } from "@fortawesome/free-solid-svg-icons";


// TODO make the design more aligned center
const WorkoutBox = ({
  note,
  date,
  exercises,
  showCheckbox = false,
}: WorkoutEntry.Props) => {
  return (
    <div className={styles.workout}>
      <div className={styles.header}>
        <div className={styles.note}><FontAwesomeIcon icon={faDumbbell} /> {note}</div>
        <div className={styles.date}>{dayjs(date).format("DD/MM/YYYY")}</div>
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
