export interface RepTemplate {
  count: number;
}

export interface ExerciseTemplate {
  name: string;
  slug: string;
  reps: RepTemplate[];
}

export interface WorkoutTemplate {
  name: string;
  id: string;
  exercises: ExerciseTemplate[];
}

export interface Rep {
  count: number;
  weight?: number;
}

export interface Exercise {
  name: string;
  slug: string;
  reps: Rep[];
}

export interface Workout {
  name: string;
  id: string; // this will be different to WorkoutTemplate.id
  startTime: Date;
  endTime?: Date;
  exercises: Exercise[];
}
