import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Exercise } from '../../models/exercise.model';
import { NgFor, NgIf } from '@angular/common';
import { Intensity } from '../../enums/intensity.enum';
import { ExerciseService } from '../../services/exercise.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-exercise',
  standalone: true,
  imports: [FormsModule, NgIf, NgFor, RouterModule],
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.css']
})
export class ExerciseComponent implements OnInit {
  exercises: Exercise[] = [];
  static ID: number = 1;
  intensities = Object.values(Intensity);
  newExercise: Exercise = new Exercise("0", "", "", 0, 0, 0, 0, Intensity.Low);

  constructor(private exerciseService:ExerciseService, 
    private router:Router) {}

    ngOnInit(): void {
      this.getExercises();
    }
  
    getExercises() {
      this.exerciseService.getAll().subscribe((data) => {
        this.exercises = data;
        let maxId = 0;
      let id = 0;
      for (let i=0; i<this.exercises.length; i++) {
        id = Number(this.exercises[i].id);
        if (id > maxId) {maxId = id;}
      }
      ExerciseComponent.ID = maxId + 1;
      });
    }

  addExercise(form: NgForm) {
    if (form.valid) {
      const exerciseToAdd = new Exercise(
        String(ExerciseComponent.ID++),
        this.newExercise.name,
        this.newExercise.description,
        this.newExercise.sets,
        this.newExercise.reps,
        this.newExercise.duration,
        this.newExercise.caloriesBurned,
        this.newExercise.intensity
      );
      
      this.exerciseService.createExercise(exerciseToAdd).subscribe({
        next:(data) => {
          this.exercises.push(data);
          this.router.navigate(["/Exercises"]);
        },
        error:(err) => {
          console.log(err);
        }
      });
      console.log("Added exercise:", this.newExercise);
      form.reset();
      this.newExercise = new Exercise("1", "", "", 1, 1, 1, 1, Intensity.Low);
    }
  }

  deleteExercise(id:string) {
    this.exerciseService.delete(id).subscribe({
      next: () => {
        const exerciseIndex = this.exercises.findIndex((exercise) => exercise.id === id);
        if (exerciseIndex !== -1) {
          this.exercises.splice(exerciseIndex, 1);
        }
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

   getFullDescription(exercise:Exercise): string {
    return `${exercise.name} : ${exercise.description}. Intensity: ${exercise.intensity} Sets: ${exercise.sets}, Reps: ${exercise.reps}, Duration: ${exercise.duration} seconds.`;
  }

  intensityModifier(exercise:Exercise): number {
    switch (exercise.intensity) {
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

  calculateCalories(exercise:Exercise) :number {
    // Примерный расчёт
    return exercise.duration * (exercise.caloriesBurned / 60) * this.intensityModifier(exercise);
  }
}