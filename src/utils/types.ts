export interface Exercise {
  name: string;
  weight: string;
  effort: string;
  typeOfTraining: string;
  id?: string;
  completed?: boolean;
}

export interface Workout {
  backendId?: string;
  id: string;
  date: string; // for now TODO change it to some date type in TS
  exercises: Exercise[];
  note: string;
  saveAsRoutine?: boolean;
}

export interface Routine {
  backendId?: string;
  id?: string;
  exercises: Exercise[];
  note: string;
}
