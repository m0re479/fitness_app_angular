import { Intensity } from "../enums/intensity.enum";
import { WorkoutType } from "../enums/workoutType.enum";
import { Exercise } from "./exercise.model";
import { User } from "./user.model";

export class Workout {
  public duration: number;

  constructor(
    public id: string,
    public user: User,
    public dateTime: Date,
    public type: WorkoutType,
    public exercises: Exercise[],
    public intensity: Intensity
  ) {
    this.duration = this.calculateDuration();
  }

  updateWorkout(updatedData: Partial<Workout>): void {
    Object.assign(this, updatedData);
  }

  addExercise(exercise: Exercise): void {
    this.exercises.push(exercise);
    this.duration = this.calculateDuration();
  }

  removeExercise(index: string): void {
    this.exercises.splice(Number(index), 1);
    this.duration = this.calculateDuration();
  }

  calculateDuration(): number {
    let totalDuration = 0;
    for (const exercise of this.exercises) {
        totalDuration += exercise.duration;
    }
    return totalDuration;
  }
}