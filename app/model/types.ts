export interface RepTemplate {
  count: number;
  order: number;
}

export interface NewExerciseTemplate {
  name: string;
  reps: RepTemplate[];
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

export interface Rep {
  count: number;
  weight?: number;
}

export interface Exercise {
  name: string;
  id: string;
  reps: Rep[];
}

export interface Workout {
  name: string;
  id: string;
  startTime: Date;
  endTime?: Date;
  exercises: Exercise[];
}
