interface ExerciseDetails {
  name: string;
}

export interface NewExercise {
  order: 0;
  setOrder: 0;
  type: string;
  reps?: number;
  duration?: number;
  exercise: ExerciseDetails;
}

export interface Exercise extends NewExercise {
  weight?: number;
  id: string;
}

export interface NewWorkoutTemplate {
  name: string;
  exercises: NewExercise[];
}

export interface WorkoutTemplate extends NewWorkoutTemplate {
  id: string;
  exercises: Exercise[];
}

export interface Workout {
  name: string;
  id: string;
  startTime: Date;
  endTime?: Date;
  exercises: Exercise[];
}
