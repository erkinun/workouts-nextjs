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
  | { type: "remove" }
  | { type: "update" }
  | { type: "set"; workouts: Workout[] };

type Action = ActionType & Payload;
type Dispatch = (action: Action) => void;
type State = Array<Workout>;

// TODO add routines to this state too
function workoutsReducer(state: State, action: Action) {
  switch (action.type) {
    case "set":
      return action.workouts;

    case "add":
      return [...state, action.payload];

    case "remove":
      return state.filter((workout) => workout.id !== action.payload.id);

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

  console.log("workout provider with: ", workouts, initialWorkouts);

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
  console.log("loading workouts: ", authUser);
  if (authUser) {
    const workoutsRef = ref(database, `users/${authUser.uid}/workouts`);
    onValue(workoutsRef, (snapshot) => {
      // TODO test if this fn gets called after new workout is added in add.tsx

      const workouts: Array<any> = [];
      snapshot.forEach((child) => {
        workouts.push({
          backendId: child.key,
          ...child.val(),
        });
      });

      console.log("CALLING FROM ON VALUE", workouts);
      dispatch({ type: "set", workouts, payload: null });
    });
  }
}
