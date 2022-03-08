import {
  ActionFunction,
  Form,
  LoaderFunction,
  redirect,
  useLoaderData,
  useSubmit,
} from "remix";
import {
  getWorkout,
  updateUserWorkoutExercises,
  duplicateExercise,
  deleteExercise,
} from "~/services/workouts";
import { Exercise, Workout } from "~/model/types";
import set from "lodash/set";
import { DuplicateIcon, TrashIcon } from "@heroicons/react/solid";
import { Button } from "~/components/button";

interface Props {
  exercises: Exercise[];
}

function Workout({ exercises }: Props) {
  return (
    <div className="border-b border-b-slate-500 mb-6 pb-4">
      <h3 className="text-xl font-bold mb-3 text-blue-500">
        {exercises[0].exercise.name}
      </h3>
      {exercises.map((exercise) => (
        <div className="flex flex-row py-2 justify-between">
          <div>
            <label htmlFor="reps" className="font-bold mr-4">
              Reps
            </label>
            <input
              id="reps"
              name={`sets.${exercise.id}.reps`}
              type="number"
              className="shadow appearance-none border w-12 rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              defaultValue={exercise.reps}
            />
          </div>
          <div>
            <label htmlFor="weight" className="font-bold mx-4">
              KG
            </label>
            <input
              id="weight"
              type="number"
              name={`sets.${exercise.id}.weight`}
              className="shadow appearance-none border w-24 rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              defaultValue={exercise.weight}
            />
          </div>
          <button
            type="submit"
            name="_action"
            value={`duplicate:${exercise.id}`}
          >
            <DuplicateIcon className="h-8 w-8 text-black" />
          </button>

          <button type="submit" name="_action" value={`delete:${exercise.id}`}>
            <TrashIcon className="h-8 w-8  text-black" />
          </button>
        </div>
      ))}
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

const parseFields = (input: FormData) => {
  const output: any = {};

  for (let line of input) {
    set(output, line[0].split("."), line[1]);
  }
  return output;
};

export const action: ActionFunction = async ({ request }) => {
  console.log("ACTION");
  // console.log(request);
  const form = await request.formData();

  const id = form.get("id");
  const action = form.get("_action") as string;

  if (action === "save" || action === "finish") {
    const fields = parseFields(form);

    await updateUserWorkoutExercises(fields.sets);
    return null;
  }
  if (action?.startsWith("duplicate")) {
    const id = action.split(":")[1];
    return await duplicateExercise(id);
  }

  if (action?.startsWith("delete")) {
    const id = action.split(":")[1];
    return await deleteExercise(id);
  }

  return null;
};

function groupExercises(workout: Workout) {
  const groups: Exercise[][] = [];
  for (let exercise of workout.exercises) {
    groups[exercise.order] = (groups[exercise.order] || []).concat(exercise);
  }

  for (let group of groups) {
    group.sort((a, b) => a.setOrder - b.setOrder);
  }

  return groups;
}

export default function SingleWorkout() {
  const data = useLoaderData<LoaderData>();
  const grouped = groupExercises(data);

  return (
    <div>
      <h2 className="text-4xl font-extrabold mb-4">{data.name}</h2>
      <Form replace method="post">
        <input type="hidden" name="id" value={data.id} />
        {grouped.map((exercises) => (
          <Workout key={exercises[0].id} exercises={exercises} />
        ))}
        <div className="mb-4">
          <Button name="_action" type="submit" value="save">
            Save
          </Button>
        </div>
        <div className="mb-4">
          <Button name="_action" type="submit" value="finish">
            Finish
          </Button>
        </div>
      </Form>
    </div>
  );
}
