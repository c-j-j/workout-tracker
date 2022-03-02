export interface SetTemplate {
  reps: number;
  order: number;
}

export interface NewExerciseTemplate {
  name: string;
  sets: SetTemplate[];
}

export interface ExerciseTemplate extends NewExerciseTemplate {
  id: string;
}

export interface NewWorkoutTemplate {
  name: string;
  exercises: NewExerciseTemplate[];
}

export interface WorkoutTemplate extends NewWorkoutTemplate {
  id: string;
  exercises: ExerciseTemplate[];
}

export interface Set {
  reps: number;
  order: number;
  weight?: number;
}

export interface Exercise {
  name: string;
  id: string;
  sets: Set[];
}

export interface Workout {
  name: string;
  id: string;
  startTime: Date;
  endTime?: Date;
  exercises: Exercise[];
}
