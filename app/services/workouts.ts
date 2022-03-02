import { db } from "~/utils/db.server";

export const getWorkouts = async () => {
  return await db.workoutTemplate.findMany();
};

export const getWorkoutTemplate = (id: string) => {
  return db.workoutTemplate.findUnique({
    where: { id },
    include: { exercises: { include: { reps: true } } },
  });
};

export const getWorkout = (id: string) => {
  return db.workout.findUnique({
    where: { id },
    include: { exercises: { include: { reps: true } } },
  });
};

export const createUserWorkout = async (id: string) => {
  const workoutTemplate = await getWorkoutTemplate(id);
  if (!workoutTemplate) throw new Error("no workout template found");

  return db.workout.create({
    data: {
      ...workoutTemplate,
      exercises: {
        create: workoutTemplate.exercises.map((exercise) => ({
          ...exercise,
          workoutId: undefined,
          reps: {
            create: exercise.reps.map((rep) => ({
              ...rep,
              exerciseId: undefined,
              weight: 0,
            })),
          },
        })),
      },
    },
  });
};
