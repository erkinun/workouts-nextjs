import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { ref, onValue } from "firebase/database";
import { database } from "../utils/firebase";
import { Workout } from "./types";

type Payload = { payload: Workout };

type ActionType =
  | { type: "add" }
  | { type: "remove"; id: string }
  | { type: "update" }
  | { type: "set"; workouts: Workout[] };

type Action = ActionType & Payload;
type Dispatch = (action: Action) => void;
type State = Array<Workout>;

// TODO add routines to this state too
// TODO does it have any meaning to have this reducer without updating the firebase db
// TODO maybe remove it and make it just a state?
function workoutsReducer(state: State, action: Action) {
  switch (action.type) {
    case "set":
      return action.workouts;

    case "add":
      return [...state, action.payload];

    case "remove":
      return state.filter((workout) => workout.backendId !== action.id);

    case "update":
      return state.map((workout) => {
        if (workout.id === action.payload.id) {
          return action.payload;
        }
        return workout;
      });

    default:
      return state;
  }
}

const WorkoutContext = createContext<
  { workouts: State; dispatch: Dispatch } | undefined
>(undefined);

export const WorkoutProvider = ({ children, authUser }) => {
  const [initialWorkouts, setInitialWorkouts] = useState([]);
  const [workouts, dispatch] = useReducer(workoutsReducer, initialWorkouts);
  const value = { workouts, dispatch };

  useEffect(() => {
    loadWorkouts(authUser, dispatch);
  }, [authUser]);

  return (
    <WorkoutContext.Provider value={value}>{children}</WorkoutContext.Provider>
  );
};

export function useWorkouts() {
  const context = useContext(WorkoutContext);

  if (context === undefined) {
    throw new Error("useWorkouts must be used within a WorkoutsProvider");
  }

  return context;
}

export function loadWorkouts(authUser, dispatch) {
  if (authUser) {
    const workoutsRef = ref(database, `users/${authUser.uid}/workouts`);
    onValue(workoutsRef, (snapshot) => {
      const workouts: Array<any> = [];
      snapshot.forEach((child) => {
        workouts.push({
          backendId: child.key,
          ...child.val(),
        });
      });

      dispatch({ type: "set", workouts, payload: null });
    });
  }
}
