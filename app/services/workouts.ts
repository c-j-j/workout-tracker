import { db } from "~/utils/db.server";

export const getWorkouts = async () => {
  return await db.workoutTemplate.findMany();
};

export const getWorkoutTemplate = (id: string) => {
  return db.workoutTemplate.findUnique({
    where: { id },
    include: { exercises: { include: { sets: true } } },
  });
};

export const getWorkout = (id: string) => {
  return db.workout.findUnique({
    where: { id },
    include: { exercises: { include: { sets: true } } },
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
          sets: {
            create: exercise.sets.map((set) => ({
              ...set,
              exerciseId: undefined,
              weight: 0,
            })),
          },
        })),
      },
    },
  });
};

export const updateUserWorkoutExercises = async (sets) => {
  for (let entry of Object.entries(sets)) {
    const setId = entry[0];
    const setData = entry[1];
    await db.set.update({
      where: { id: setId },
      data: {
        ...setData,
        weight: Number(setData.weight),
        reps: Number(setData.reps),
      },
    });
  }
  // const foo = {
  //   ...updatedExercise,
  //   sets: {
  //     update: updatedExercise.sets,
  //   },
  // };
  // console.log({ foo });
  // await db.exercise.update({
  //   where: { id: exerciseId },
  //   data: foo,
  // });
};
