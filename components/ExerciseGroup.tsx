import { Exercise } from "../utils/types";
import styles from "./ExerciseGroup.module.scss";

export default function ExerciseGroup({
  exercises = [],
  addExercise,
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
              <ExerciseRow index={i} {...e} />
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
  };
}

// TODO handle the hidden property
const ExerciseRow = ({ index, name, weight, effort, typeOfTraining }) => {
  return (
    <div className={styles.row}>
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
      {
        // TOD replace this with a menu component
      }
      {/* <Popup
        trigger={<div className="helper">More</div>}
        position="right center"
      >
        <div>
          <ul>
            <li onClick={this.showWeight}>Add Weight</li>
            <li onClick={this.showEffort}>Add Effort</li>
            <li onClick={this.showType}>Add Type</li>
            <li onClick={this.remove}>Remove Exercise</li>
          </ul>
        </div>
      </Popup> */}
    </div>
  );
};
