import { Exercise as ExerciseType } from "../utils/types";

const ExerciseBox = ({
  name,
  weight,
  effort,
  typeOfTraining,
  showCheckBox = false,
}: Exercise.Props) => {
  return (
    <div className="exercise">
      {showCheckBox && (
        <div>
          <input type="checkbox" />
        </div>
      )}
      <div className="name">{name}</div>
      <div className="details">
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
