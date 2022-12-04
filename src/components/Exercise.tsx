import { Exercise as ExerciseType } from '../utils/types';
import styles from './Exercise.module.scss';

const ExerciseBox = ({
  name,
  weight,
  effort,
  typeOfTraining,
  completed = false,
  showCheckBox = false,
  markExerciseAsDone,
}: ExerciseProps) => {
  return (
    <div className={styles.exercise}>
      {showCheckBox && (
        <div>
          <input
            checked={completed}
            onChange={(e) => markExerciseAsDone(name, e.target.checked)}
            type="checkbox"
          />
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

export type ExerciseProps = ExerciseType & {
  showCheckBox: boolean;
  markExerciseAsDone?: (exerciseName: string, done: boolean) => void;
};

export default ExerciseBox;
