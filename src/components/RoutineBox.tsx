import { Routine } from '../utils/types';
import ExercisesList from './ExercisesList';

import styles from './Workout.module.scss';

export const RoutineBox = ({ note, exercises }: RoutineBoxProps) => {
  return (
    <div className={styles.workout}>
      <div className={styles.header}>
        <div className="note">
          <i className="fa-solid fa-pen"></i> {note}
        </div>
        <div className="date"></div>
      </div>
      <ExercisesList showCheckBox={false} exercises={exercises} />
    </div>
  );
};

export type RoutineBoxProps = Routine;
