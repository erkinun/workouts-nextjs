import { Exercise as ExerciseType } from "../utils/types";
import ExerciseBox from "./Exercise";
import styles from "./ExerciseList.module.scss";

const ExerciseList = ({
  exercises = [],
  showCheckBox = false,
}: ExerciseList.Props) => {
  return (
    <div className={styles.listItem}>
      <div className={styles.exerciseList}>
        {exercises.map((e) => (
          <ExerciseBox
            showCheckBox={showCheckBox}
            key={JSON.stringify(e)}
            {...e}
          />
        ))}
      </div>
      <br />
    </div>
  );
};

export namespace ExerciseList {
  export type Props = {
    exercises: Array<ExerciseType>;
    showCheckBox: Boolean;
  };
}

export default ExerciseList;
