import ExercisesList from "./ExercisesList";
import dayjs from "dayjs";
import { Workout } from "../utils/types";

const WorkoutBox = ({
  note,
  date,
  exercises,
  showCheckbox = false,
}: WorkoutEntry.Props) => {
  return (
    <div className="workout">
      <div className="workout-header">
        <div className="note">{note}</div>
        <div className="date">{dayjs(date).format("DD/MM/YYYY")}</div>
      </div>
      <ExercisesList showCheckBox={showCheckbox} exercises={exercises} />
    </div>
  );
};

export namespace WorkoutEntry {
  export type Props = Workout & {
    showCheckbox: Boolean;
  };
}

export default WorkoutBox;
