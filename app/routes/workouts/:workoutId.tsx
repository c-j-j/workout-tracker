import { Link } from "@remix-run/react";
import { ActionFunction, LoaderFunction, redirect, useLoaderData } from "remix";
import { createUserWorkout, getWorkoutTemplate } from "~/services/workouts";
import { ExerciseTemplate, Workout, WorkoutTemplate } from "~/model/types";

interface Props {
  exercise: ExerciseTemplate;
}

function Workout({ exercise }: Props) {
  return (
    <div>
      <Link to={`/exercises/${exercise.name}`}>{exercise.name}</Link>
      <div>{exercise.sets.length}</div>
    </div>
  );
}

type LoaderData = WorkoutTemplate;

export const loader: LoaderFunction = async ({ params: { workoutId } }) => {
  if (!workoutId) throw new Error("no workout param specified");
  return await getWorkoutTemplate(workoutId);
};

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const workoutId = form.get("workout-id");

  if (!workoutId) {
    throw new Error("no workout id specified");
  }
  const userWorkout = await createUserWorkout(workoutId as string);
  if (!userWorkout) {
    throw new Error("unable to create user workout");
  }
  return redirect(`/user-workouts/${userWorkout.id}`);
};

export default function SingleWorkout() {
  const data = useLoaderData<LoaderData>();

  return (
    <div>
      <h2>{data.name}</h2>
      {data.exercises.map((exercise) => (
        <Workout key={exercise.name} exercise={exercise} />
      ))}
      <form method="post">
        <input type="hidden" name="workout-id" value={data.id} />
        <button type="submit">Start workout</button>
      </form>
    </div>
  );
}
