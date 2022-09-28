import LoggedIn, { useFirebaseAuth } from "../components/LoggedIn";

export default function Routines() {
  const { authUser, loading } = useFirebaseAuth();

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
