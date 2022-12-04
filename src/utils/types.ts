export type Exercise = {
  name: string;
  weight: string;
  effort: string;
  typeOfTraining: string;
  id?: string;
  completed?: boolean;
};

export type Workout = {
  backendId?: string;
  id: string;
  date: string; // for now TODO change it to some date type in TS
  exercises: Array<Exercise>;
  note: string;
  saveAsRoutine?: boolean;
};

export type Routine = {
  backendId?: string;
  id?: string;
  exercises: Array<Exercise>;
  note: string;
};
