import { Link } from "@remix-run/react";

export default function Index() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1 className="text-3xl font-extrabold">Workout Tracker</h1>
      <div>
        <Link className="text-blue-800 font-bold py-4" to="/workouts">
          All Workouts
        </Link>
      </div>
      <div>
        <Link className="text-blue-800 font-bold py-4" to="/workouts/new">
          Create New Workout
        </Link>
      </div>
    </div>
  );
}
