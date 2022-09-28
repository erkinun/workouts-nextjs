import LoggedIn from "../components/LoggedIn";
import { useAuth } from "../utils/authContext";

export default function Routines() {
  const { authUser, loading } = useAuth();

  if (!loading && authUser) {
    return (
      <LoggedIn>
        <div>Routines will be here {authUser.displayName}</div>
      </LoggedIn>
    );
  } else {
    return <div>Loading...</div>;
  }
}
