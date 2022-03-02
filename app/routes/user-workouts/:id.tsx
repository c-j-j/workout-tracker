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

interface Props {
  exercise: Exercise;
}

function Workout({ exercise }: Props) {
  return (
    <div>
      <h3>{exercise.name}</h3>
      <input type="hidden" name="exercise-id" value={exercise.id} />
      {exercise.sets.map((set) => {
        return (
          <div key={set.order}>
            <label htmlFor="reps">Reps</label>
            <input
              id="reps"
              name={`sets.${set.id}.reps`}
              type="number"
              defaultValue={set.reps}
            />
            <label htmlFor="weight">Weight</label>
            <input
              id="weight"
              type="number"
              name={`sets.${set.id}.weight`}
              defaultValue={set.weight}
            />
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
      <h2>{data.name}</h2>
      <Form method="post" onSubmit={handleChange}>
        <input type="hidden" name="id" value={data.id} />
        {data.exercises.map((exercise) => (
          <Workout key={exercise.id} exercise={exercise} />
        ))}
        <button type="submit">Save workout</button>
      </Form>
    </div>
  );
}
