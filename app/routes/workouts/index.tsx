import { getWorkouts } from "~/services/workouts";
import { LoaderFunction, useLoaderData } from "remix";
import { WorkoutTemplate } from "~/model/types";
import { Link } from "@remix-run/react";
import { Button } from "~/components/button";

type LoaderData = Array<WorkoutTemplate>;
export const loader: LoaderFunction = () => {
  return getWorkouts();
};

export default function New() {
  const data = useLoaderData<LoaderData>();
  return (
    <div>
      <h2 className="text-2xl mb-3 font-extrabold">All Workouts</h2>
      <h3 className="text-xl mb-3 font-bold">Legs</h3>
      {data.map((workout) => (
        <div
          key={workout.id}
          className="flex flex-row items-center py-4 justify-between border-b border-b-slate-200"
        >
          <p>{workout.name}</p>
          <div className="w-auto">
            <Link to={workout.id}>
              <Button>View</Button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
