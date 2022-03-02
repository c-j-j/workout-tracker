import { PrismaClient } from "@prisma/client";
import { NewWorkoutTemplate } from "~/model/types";
const db = new PrismaClient();

async function seed() {
  await Promise.all(
    getWorkouts().map(async (workout) => {
      return await db.workoutTemplate.create({
        data: {
          ...workout,
          exercises: {
            create: workout.exercises.map((exercise) => ({
              ...exercise,
              reps: { create: exercise.reps },
            })),
          },
        },
      });
    })
  );
}

seed();

function getWorkouts(): NewWorkoutTemplate[] {
  return [
    {
      name: "Leg Workout",
      exercises: [
        {
          name: "Squats",
          reps: [
            {
              count: 10,
              order: 1,
            },
            {
              count: 10,
              order: 2,
            },
            {
              count: 10,
              order: 3,
            },
          ],
        },
      ],
    },
  ];
}
