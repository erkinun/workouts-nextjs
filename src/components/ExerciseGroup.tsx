import { useEffect } from 'react';
import { Control, useFieldArray, UseFormRegister } from 'react-hook-form';
import { Exercise } from '../utils/types';
import styles from './ExerciseGroup.module.scss';

export interface ExerciseGroupProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any, any>;
  exercises: Exercise[];
}

export default function ExerciseGroup({
  control,
  register,
  exercises,
}: ExerciseGroupProps) {
  const { fields, append, remove, replace } = useFieldArray({
    control,
    name: 'exercises',
  });

  useEffect(() => {
    replace(exercises);
  }, [exercises]);

  const addNewExercise = () => {
    append({
      name: '',
      weight: '',
      effort: '',
      typeOfTraining: '',
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
                addExercise={() => addNewExercise()}
              />
            </li>
          ))}
        </ul>
        <br />
      </div>
    </>
  );
}

const ExerciseRow = ({
  index,
  register,
  deleteExercise,
  addExercise,
  id = '',
}: {
  index: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<any>;
  deleteExercise: () => void;
  addExercise: () => void;
  id?: string;
}) => {
  const handleAddExercise = (event) => {
    event.preventDefault();
    addExercise();
  };

  return (
    <div className={styles.row} key={id}>
      <input
        className={styles.textInput}
        type="text"
        placeholder={'exercise ' + (index + 1)}
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
        <button
          data-type="delete"
          onClick={() => deleteExercise(id)}
          className="button"
        >
          <i className="fa-solid fa-trash-can"></i>
        </button>
        <button onClick={handleAddExercise} className="button">
          <i className="fa-solid fa-plus"></i>
        </button>
      </div>
    </div>
  );
};
