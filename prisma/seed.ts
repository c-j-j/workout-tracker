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
              sets: { create: exercise.sets },
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
          sets: [
            {
              reps: 10,
              order: 0,
            },
            {
              reps: 10,
              order: 1,
            },
            {
              reps: 10,
              order: 2,
            },
          ],
        },
        {
          name: "Lunges",
          sets: [
            {
              reps: 10,
              order: 0,
            },
            {
              reps: 10,
              order: 1,
            },
            {
              reps: 10,
              order: 2,
            },
          ],
        },
        {
          name: "Hip Thrusts",
          sets: [
            {
              reps: 10,
              order: 0,
            },
            {
              reps: 10,
              order: 1,
            },
            {
              reps: 10,
              order: 2,
            },
          ],
        },
      ],
    },
  ];
}
