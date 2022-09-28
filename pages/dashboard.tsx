import LoggedIn from "../components/LoggedIn";

export default function Dashboard() {
  return (
    <LoggedIn>
      <>
        <main>
          <h1 className="title">Workouts will be listed here</h1>
          {/* <h2>{user ? "Logged in" : "Not logged in"}</h2> */}
        </main>

        {
          // TODO remove this and add your own
        }
      </>
    </LoggedIn>
  );
}
