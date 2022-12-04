import { Exercise as ExerciseType } from '../utils/types';
import ExerciseBox from './Exercise';
import styles from './ExerciseList.module.scss';

const ExerciseList = ({
  exercises = [],
  showCheckBox = false,
  markExerciseAsDone,
}: ExerciseListProps) => {
  return (
    <div className={styles.listItem}>
      <div className={styles.exerciseList}>
        {exercises.map((e) => (
          <ExerciseBox
            markExerciseAsDone={markExerciseAsDone}
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

export type ExerciseListProps = {
  exercises: ExerciseType[];
  showCheckBox: boolean;
  markExerciseAsDone?: (exerciseName: string, done: boolean) => void;
};

export default ExerciseList;
