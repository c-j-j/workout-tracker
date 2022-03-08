import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

async function seed() {
  await Promise.all(
    getWorkouts().map(async (workout) => {
      return await db.workoutTemplate.create({
        data: {
          ...workout,
          exercises: {
            create: workout.exercises,
          },
        },
      });
    })
  );
}

seed();

function getWorkouts() {
  return [
    {
      name: "Leg Workout",
      exercises: [
        {
          exercise: {
            create: {
              name: "Squats",
            },
          },
          order: 0,
          setOrder: 0,
          type: "weighted-reps",
          reps: 8,
        },
      ],
    },
  ];
}
