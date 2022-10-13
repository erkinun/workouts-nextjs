import { Control, useFieldArray, UseFormRegister } from "react-hook-form";
import styles from "./ExerciseGroup.module.scss";

export default function ExerciseGroup({
  control,
  register,
}: ExerciseGroup.Props) {
  const { fields, append, remove, insert } = useFieldArray({
    control,
    name: "exercises",
  });

  console.log({ fields });

  const addNewExercise = () => {
    append({
      name: "",
      weight: "",
      effort: "",
      typeOfTraining: "",
    });
  };

  return (
    <>
      <label htmlFor="addExercise">Manually</label>
      <button
        onClick={addNewExercise}
        name="addExercise"
        type="button"
        className="button"
      >
        Add Exercise
      </button>
      <div className="list-item">
        <ul className={styles.exerciseList}>
          {fields.map((item, i) => (
            <li key={item.id}>
              <ExerciseRow
                index={i}
                register={register}
                deleteExercise={() => remove(i)}
                addExercise={() =>
                  insert(i + 1, {
                    name: "",
                    weight: "",
                    effort: "",
                    typeOfTraining: "",
                  })
                }
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
    register: UseFormRegister<any>;
    control: Control<any, any>;
  };
}

const ExerciseRow = ({
  index,
  register,
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
        {...register(`exercises.${index}.name` as const)}
      />
      <input
        className={`${styles.textInput} ${styles.smallInput}`}
        type="text"
        placeholder="weight"
        {...register(`exercises.${index}.weight` as const)}
      />
      <input
        className={`${styles.textInput} ${styles.smallInput}`}
        type="text"
        placeholder="effort"
        {...register(`exercises.${index}.effort` as const)}
      />
      <input
        className={`${styles.textInput} ${styles.smallInput}`}
        type="text"
        placeholder="type"
        {...register(`exercises.${index}.typeOfTraining` as const)}
      />
      <div className={styles.buttonGroup}>
        <button onClick={() => deleteExercise(id)} className="button">
          Delete
        </button>
        <button onClick={addExercise} className="button">
          Add Another
        </button>
      </div>
    </div>
  );
};
