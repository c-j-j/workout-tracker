import { Link } from "@remix-run/react";
import { ActionFunction, LoaderFunction, redirect, useLoaderData } from "remix";
import { createUserWorkout, getWorkout } from "~/services/workouts";
import { ExerciseTemplate, Workout, WorkoutTemplate } from "~/model/types";

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

type LoaderData = WorkoutTemplate;

export const loader: LoaderFunction = ({ params: { workoutId } }) => {
  if (!workoutId) throw new Error("ahhhhhhh");
  return getWorkout(workoutId);
};

export const action: ActionFunction = async ({ request }) => {
  console.log("ACTION");
  const form = await request.formData();
  const workoutId = form.get("workout-id");

  console.log({ workoutId });
  if (!workoutId) {
    throw new Error("no workout id specified");
  }
  const userWorkout = await createUserWorkout(workoutId as string);
  console.log({ userWorkout });
  return redirect(`/user-workouts/${userWorkout.id}`);
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
