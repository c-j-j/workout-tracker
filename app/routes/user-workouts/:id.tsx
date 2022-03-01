import { Link } from "@remix-run/react";
import { LoaderFunction, useLoaderData } from "remix";
import { getUserWorkout } from "~/services/workouts";
import { ExerciseTemplate, Workout } from "~/model/types";

interface Props {
  exercise: ExerciseTemplate;
}

function Workout({ exercise }: Props) {
  return (
    <div>
      <Link to={`/exercises/${exercise.slug}`}>{exercise.name}</Link>
      <div>{exercise.reps.length}</div>
    </div>
  );
}

type LoaderData = Workout;

export const loader: LoaderFunction = ({ params: { id } }) => {
  console.log("id", id);
  if (!id) throw new Error("ahhhhhhh");
  const workout = getUserWorkout(id);
  if (!workout) {
    throw new Error("No workout found");
  }
  return workout;
};

export default function SingleWorkout() {
  const data = useLoaderData<LoaderData>();

  return (
    <div>
      <h2>{data.name}</h2>
      {data.exercises.map((exercise) => (
        <Workout key={exercise.slug} exercise={exercise} />
      ))}
      <form method="post">
        <input type="hidden" name="workout-id" value={data.id} />
        <button type="submit">Start workout</button>
      </form>
    </div>
  );
}
