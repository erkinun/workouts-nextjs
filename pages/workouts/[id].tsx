import { useRouter } from "next/router";

export default function Workout() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div>
      <h1>Workout {id}</h1>
    </div>
  );
}
