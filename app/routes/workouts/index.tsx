import { getWorkouts } from "~/services/workouts";
import { LoaderFunction, useLoaderData } from "remix";
import { WorkoutTemplate } from "~/model/types";
import { Link } from "@remix-run/react";

type LoaderData = Array<WorkoutTemplate>;
export const loader: LoaderFunction = () => {
  return getWorkouts();
};

export default function New() {
  const data = useLoaderData<LoaderData>();
  return (
    <div>
      {data.map((workout) => (
        <Link key={workout.id} to={workout.id}>
          {workout.name}
        </Link>
      ))}
    </div>
  );
}
