import { Intensity } from "../enums/intensity.enum";


export class Exercise {
  constructor(
    public id: string,
    public name: string,
    public description: string,
    public sets: number,
    public reps: number,
    public duration: number,
    public caloriesBurned: number,
    public intensity: Intensity
  ) {}

  calculateCalories(): number {
    // Примерный расчёт
    return this.duration * (this.caloriesBurned / 60) * this.intensityModifier();
  }

  intensityModifier(): number {
    switch (this.intensity) {
      case Intensity.Low:
        return 0.75;
      case Intensity.Medium:
        return 1.0;
      case Intensity.High:
        return 1.25;
      default:
        return 1.0;
    }
  }

  updateExercise(updatedData: Partial<Exercise>): void {
    if (updatedData.name) {
        this.name = updatedData.name;
    }
    if (updatedData.description) {
        this.description = updatedData.description;
    }
    if (updatedData.sets) {
        this.sets = updatedData.sets;
    }
    if (updatedData.reps) {
        this.reps = updatedData.reps;
    }
    if (updatedData.duration) {
        this.duration = updatedData.duration;
    }
    if (updatedData.caloriesBurned) {
        this.caloriesBurned = updatedData.caloriesBurned;
    }
    if (updatedData.intensity) {
        this.intensity = updatedData.intensity;
    }
}
}