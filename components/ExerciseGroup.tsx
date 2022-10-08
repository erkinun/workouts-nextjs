import { Exercise } from "../utils/types";
import styles from "./ExerciseGroup.module.scss";

export default function ExerciseGroup({
  exercises = [],
  addExercise,
  deleteExercise,
}: ExerciseGroup.Props) {
  return (
    <>
      <label htmlFor="addExercise">Manually</label>
      <button
        onClick={addExercise}
        name="addExercise"
        type="button"
        className="button"
      >
        Add Exercise
      </button>
      <div className="list-item">
        <ul className={styles.exerciseList}>
          {exercises.map((e, i) => (
            <li key={i}>
              <ExerciseRow
                index={i}
                {...e}
                deleteExercise={(id: string) => deleteExercise(id)}
                addExercise={() => addExercise()}
              />
            </li>
          ))}
        </ul>
        <br />
      </div>
    </>
  );
}

export namespace ExerciseGroup {
  export type Props = {
    exercises: Array<Exercise>;
    addExercise: () => void;
    deleteExercise: (id: string) => void;
  };
}

const ExerciseRow = ({
  index,
  name,
  weight,
  effort,
  typeOfTraining,
  deleteExercise,
  addExercise,
  id = "",
}) => {
  return (
    <div className={styles.row} key={id}>
      <input
        className={styles.textInput}
        type="text"
        placeholder={"exercise " + (index + 1)}
        defaultValue={name}
      />
      <input
        defaultValue={weight}
        className={`${styles.textInput} ${styles.smallInput}`}
        type="text"
        placeholder="weight"
      />
      <input
        defaultValue={effort}
        className={`${styles.textInput} ${styles.smallInput}`}
        type="text"
        placeholder="effort"
      />
      <input
        defaultValue={typeOfTraining}
        className={`${styles.textInput} ${styles.smallInput}`}
        type="text"
        placeholder="type"
      />
      <div className={styles.buttonGroup}>
        <button onClick={() => deleteExercise(id)} className="button">
          Delete
        </button>
        <button onClick={() => addExercise()} className="button">
          Add Another
        </button>
      </div>
    </div>
  );
};
