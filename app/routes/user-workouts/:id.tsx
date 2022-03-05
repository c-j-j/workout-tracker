import {
  ActionFunction,
  Form,
  LoaderFunction,
  redirect,
  useLoaderData,
  useSubmit,
} from "remix";
import {
  createUserWorkout,
  getWorkout,
  updateUserWorkoutExercises,
} from "~/services/workouts";
import { Exercise, Workout } from "~/model/types";
import set from "lodash/set";
import { DuplicateIcon, TrashIcon } from "@heroicons/react/solid";
import { Button } from "~/components/button";

interface Props {
  exercise: Exercise;
}

function Workout({ exercise }: Props) {
  return (
    <div className="border-b border-b-slate-500 mb-6 pb-4">
      <h3 className="text-xl font-bold mb-3 text-blue-500">{exercise.name}</h3>
      <input type="hidden" name="exercise-id" value={exercise.id} />
      {exercise.sets.map((set) => {
        return (
          <div key={set.order} className="flex flex-row py-2 justify-between">
            <div>
              <label htmlFor="reps" className="font-bold mr-4">
                Reps
              </label>
              <input
                id="reps"
                name={`sets.${set.id}.reps`}
                type="number"
                className="shadow appearance-none border w-12 rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                defaultValue={set.reps}
              />
            </div>
            <div>
              <label htmlFor="weight" className="font-bold mx-4">
                KG
              </label>
              <input
                id="weight"
                type="number"
                name={`sets.${set.id}.weight`}
                className="shadow appearance-none border w-24 rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                defaultValue={set.weight}
              />
            </div>
            <DuplicateIcon className="h-8 w-8 text-black" />
            <TrashIcon className="h-8 w-8  text-black" />
          </div>
        );
      })}
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

const parseFields = (input) => {
  const output = {};

  for (let line of input) {
    set(output, line[0].split("."), line[1]);
  }
  return output;
};

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const id = form.get("id");

  const fields = parseFields(form);

  await updateUserWorkoutExercises(fields.sets);
  return redirect(`/user-workouts/${id}`);
};

export default function SingleWorkout() {
  const data = useLoaderData<LoaderData>();
  const submit = useSubmit();

  function handleChange(event: any) {
    submit(event.currentTarget, { method: "post", replace: true });
  }

  return (
    <div>
      <h2 className="text-4xl font-extrabold mb-4">{data.name}</h2>
      <Form replace method="post" onSubmit={handleChange}>
        <input type="hidden" name="id" value={data.id} />
        {data.exercises.map((exercise) => (
          <Workout key={exercise.id} exercise={exercise} />
        ))}
        <div className="mb-4">
          <Button>Save</Button>
        </div>
        <div className="mb-4">
          <Button>Finish</Button>
        </div>
      </Form>
    </div>
  );
}
