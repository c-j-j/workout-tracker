import { Exercise, Workout, WorkoutTemplate } from "~/model/types";

/**
 * Workout -> Exercises
 *
 * UserWorkout -> Workout
 */
const workouts: WorkoutTemplate[] = [
  {
    name: "Leg Workout",
    id: "1",
    exercises: [
      {
        name: "Squats",
        slug: "squats",
        reps: [
          {
            count: 10,
          },
          {
            count: 10,
          },
          {
            count: 10,
          },
        ],
      },
    ],
  },
  {
    name: "Arm Workout",
    id: "2",
    exercises: [
      {
        name: "Bicep Curls",
        slug: "bicep-curls",
        reps: [
          {
            count: 10,
          },
          {
            count: 10,
          },
          {
            count: 10,
          },
        ],
      },
    ],
  },
];

const userWorkouts: Workout[] = [];

export const getWorkouts = (): WorkoutTemplate[] => {
  return workouts;
};

export const getWorkout = (id: string): WorkoutTemplate => {
  return workouts.find((w) => w.id === id)!;
};

export const getUserWorkout = (id: string): Workout => {
  console.log({ userWorkouts });
  return userWorkouts.find((w) => w.id === id)!;
};

export const createUserWorkout = (id: string): Workout => {
  const workout = getWorkout(id);
  const exercises: Exercise[] = workout.exercises.map(
    (exercise): Exercise => ({
      ...exercise,
      reps: exercise.reps,
    })
  );
  const userWorkout = {
    ...workout,
    id: workout.id + "-user",
    exercises,
    startTime: new Date(),
  };
  userWorkouts.push(userWorkout);
  console.log("PUSHED");
  console.log({ userWorkouts });
  return userWorkout;
};
