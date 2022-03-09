import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

async function seed() {
  const chris = await db.user.create({
    data: {
      username: "chris",
      // this is a hashed version of "twixrox"
      passwordHash:
        "$2b$10$K7L1OJ45/4Y2nIvhRVpCe.FSmhDdWoXehVzJptJ/op0lSsvqNu/1u",
    },
  });

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
