import { LoaderFunction, useLoaderData } from "remix";
import { getWorkout } from "~/services/workouts";
import { Exercise, Workout } from "~/model/types";

interface Props {
  exercise: Exercise;
}

function Workout({ exercise }: Props) {
  return (
    <div>
      <div>{exercise.name}</div>
      <div>{exercise.reps.length}</div>
    </div>
  );
}

type LoaderData = Workout;

export const loader: LoaderFunction = ({ params: { id } }) => {
  if (!id) throw new Error("no id param");

  const workout = getWorkout(id);
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
        <Workout key={exercise.id} exercise={exercise} />
      ))}
      <form method="post">
        <input type="hidden" name="workout-id" value={data.id} />
        <button type="submit">Start workout</button>
      </form>
    </div>
  );
}
