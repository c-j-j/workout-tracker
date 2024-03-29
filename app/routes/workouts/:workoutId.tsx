import {
  ActionFunction,
  Form,
  LoaderFunction,
  redirect,
  useLoaderData,
} from "remix";
import { createUserWorkout, getWorkoutTemplate } from "~/services/workouts";
import { Exercise, Workout, WorkoutTemplate } from "~/model/types";
import { requireUserId } from "~/utils/session.server";

interface Props {
  exercise: Exercise;
}

function Workout({ exercise }: Props) {
  return (
    <tr className="border-b">
      <td className="text-left py-4">{exercise.exercise.name}</td>
    </tr>
  );
}

type LoaderData = WorkoutTemplate;

export const loader: LoaderFunction = async ({ params: { workoutId } }) => {
  if (!workoutId) throw new Error("no workout param specified");
  return await getWorkoutTemplate(workoutId);
};

export const action: ActionFunction = async ({ request }) => {
  const userId = await requireUserId(request);
  const form = await request.formData();
  const workoutId = form.get("workout-id") as string;

  if (!workoutId) {
    throw new Error("no workout id specified");
  }
  const userWorkout = await createUserWorkout(workoutId, userId);
  if (!userWorkout) {
    throw new Error("unable to create user workout");
  }
  return redirect(`/user-workouts/${userWorkout.id}`);
};

export default function SingleWorkout() {
  const data = useLoaderData<LoaderData>();

  return (
    <div>
      <h2 className="text-2xl mb-6 font-extrabold">{data.name}</h2>
      <table className="mb-8 w-full max-w-md border-blue-500 table-fixed">
        <thead className="border-b">
          <tr>
            <th className="text-left py-4">Workout</th>
            <th className="text-right py-4">Reps</th>
          </tr>
        </thead>
        <tbody>
          {data.exercises.map((exercise) => (
            <Workout key={exercise.exercise.name} exercise={exercise} />
          ))}
        </tbody>
      </table>
      <Form method="post">
        <input type="hidden" name="workout-id" value={data.id} />
        <div className="flex justify-center">
          <button
            className="w-full md:w-auto bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
            type="submit"
          >
            Start workout
          </button>
        </div>
      </Form>
    </div>
  );
}
