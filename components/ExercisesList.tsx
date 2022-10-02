import { Exercise as ExerciseType } from "../utils/types";
import ExerciseBox from "./Exercise";

const ExerciseList = ({
  exercises = [],
  showCheckBox = false,
}: ExerciseList.Props) => {
  return (
    <div className="list-item">
      <div className="exercise-list">
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
