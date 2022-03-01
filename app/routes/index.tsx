import { Link } from "@remix-run/react";

export default function Index() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>Welcome to Remix</h1>
      <div>
        <Link to="/workouts">Workouts</Link>
      </div>
      <div>
        <Link to="/workouts/12345">Workout</Link>
      </div>
      <div>
        <Link to="/workouts/new">New</Link>
      </div>
    </div>
  );
}
