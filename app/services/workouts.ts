import { db } from "~/utils/db.server";

export const getWorkouts = async () => {
  return await db.workoutTemplate.findMany();
};

export const getWorkoutTemplate = (id: string) => {
  return db.workoutTemplate.findUnique({
    where: { id },
    include: {
      exercises: {
        include: {
          exercise: true,
        },
      },
    },
  });
};

export const getWorkout = (id: string) => {
  return db.workout.findUnique({
    where: { id },
    include: {
      exercises: {
        include: {
          exercise: true,
        },
      },
    },
  });
};

export const createUserWorkout = async (id: string, userId: string) => {
  const workoutTemplate = await getWorkoutTemplate(id);
  if (!workoutTemplate) throw new Error("no workout template found");

  return db.workout.create({
    data: {
      ...workoutTemplate,
      id: undefined,
      userId,
      exercises: {
        create: workoutTemplate.exercises.map((exercise) => ({
          ...exercise,
          exercise: undefined,
          id: undefined,
          workoutId: undefined,
        })),
      },
    },
  });
};

export const updateUserWorkoutExercises = async (sets: any) => {
  for (let entry of Object.entries(sets)) {
    const setId: any = entry[0];
    const setData: any = entry[1];
    await db.workoutExercise.update({
      where: { id: setId },
      data: {
        ...setData,
        weight: Number(setData.weight),
        reps: Number(setData.reps),
      },
    });
  }
};

export const duplicateExercise = async (id: string) => {
  const exercise = await db.workoutExercise.findUnique({ where: { id } });
  if (!exercise) throw new Error("no exercise found");
  const others = await db.workoutExercise.findMany({
    where: { workoutId: exercise.workoutId, exerciseId: exercise.exerciseId },
  });
  const maxSetOrder = others.reduce(
    (maxSetOrder, next) => Math.max(maxSetOrder, next.setOrder),
    0
  );

  await db.workoutExercise.create({
    data: {
      ...exercise,
      id: undefined,
      setOrder: maxSetOrder + 1,
    },
  });
  return null;
};

export const deleteExercise = async (id: string) => {
  return db.workoutExercise.delete({ where: { id } });
};
