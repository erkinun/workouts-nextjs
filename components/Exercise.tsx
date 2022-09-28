import { Exercise as ExerciseType } from "../utils/types";
import styles from "./Exercise.module.scss";

const ExerciseBox = ({
  name,
  weight,
  effort,
  typeOfTraining,
  showCheckBox = false,
}: Exercise.Props) => {
  return (
    <div className={styles.exercise}>
      {showCheckBox && (
        <div>
          <input type="checkbox" />
        </div>
      )}
      <div className={styles.name}>{name}</div>
      <div className={styles.details}>
        {weight && <div>{weight}</div>}
        {typeOfTraining && <div>{typeOfTraining}</div>}
        {effort && <div>{effort}</div>}
      </div>
    </div>
  );
};

export namespace Exercise {
  export type Props = ExerciseType & {
    showCheckBox: Boolean;
  };
}

export default ExerciseBox;
