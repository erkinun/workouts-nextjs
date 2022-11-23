import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Routine } from "../utils/types";
import ExercisesList from "./ExercisesList";

import styles from "./Workout.module.scss";

const RoutineBox = ({ note, exercises }: RoutineBox.Props) => {
  return (
    <div className={styles.workout}>
      <div className={styles.header}>
        <div className="note"><FontAwesomeIcon icon={faPen}/> {note}</div>
        <div className="date"></div>
      </div>
      <ExercisesList showCheckBox={false} exercises={exercises} />
    </div>
  );
};

export namespace RoutineBox {
  export type Props = Routine;
}

export default RoutineBox;
