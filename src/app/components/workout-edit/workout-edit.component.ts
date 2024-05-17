import { Component, OnInit } from '@angular/core';
import { Workout } from '../../models/workout.model';
import { User } from '../../models/user.model';
import { Exercise } from '../../models/exercise.model';
import { Intensity } from '../../enums/intensity.enum';
import { WorkoutType } from '../../enums/workoutType.enum';
import { ActivatedRoute, Router } from '@angular/router';
import { WorkoutService } from '../../services/workout.service';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-workout-edit',
  standalone: true,
  imports: [FormsModule, NgIf, NgFor],
  templateUrl: './workout-edit.component.html',
  styleUrl: './workout-edit.component.css'
})
export class WorkoutEditComponent implements OnInit {
  workouts: Workout[] = [];
  intensities = Object.values(Intensity);
  workoutTypes = Object.values(WorkoutType);
  exercises: Exercise[] = [];
  users: User[] = [];
  selectedWorkout: Workout = new Workout("0", this.users[0], new Date(), WorkoutType.Strength, [], Intensity.Low);
  id: string = "0";

  constructor( private route: ActivatedRoute,
    private router:Router, private workoutService: WorkoutService) {}

    getAllExercises() {
      this.workoutService.getExercises().subscribe((data) => {
        this.exercises = data;
      });
    }
  
    getAllUsers() {
      this.workoutService.getUsers().subscribe((data) => {
        this.users = data;
      });
    }  

  ngOnInit(): void {
    this.getAllExercises();
    this.getAllUsers();
    this.route.paramMap.subscribe((param) => {
      this.id = String(param.get('id'));
      this.getById(this.id);
    });
  }

  getById(id: string) {
    this.workoutService.getById(id).subscribe((data) => {
      this.selectedWorkout = data;
      console.log(this.selectedWorkout.user)
    });
  }

  calculateDuration(): number {
    let totalDuration = 0;
    for (const exercise of this.exercises) {
        totalDuration += exercise.duration;
    }
    return totalDuration;
  }

  addExerciseToWorkout(exercise: Exercise, event: Event) {
    event.preventDefault(); // Предотвращение отправки формы
    if (!this.selectedWorkout.exercises.includes(exercise)) {
      this.selectedWorkout.exercises.push(exercise);
    }
  }
  
  removeExerciseFromWorkout(exercise: Exercise, event: Event) {
    event.preventDefault(); // Предотвращение отправки формы
    const exerciseIndex = this.selectedWorkout.exercises.indexOf(exercise);
    if (exerciseIndex !== -1) {
      this.selectedWorkout.exercises.splice(exerciseIndex, 1);
      this.selectedWorkout.duration = this.calculateDuration();

    }
  }

  updateWorkout() {
        this.workoutService.update(this.selectedWorkout).subscribe({
          next: (data) => {
              this.selectedWorkout.updateWorkout(data);
            this.router.navigate(["/Workouts"])
          },
          error: (err) => {
            console.log(err);
          }
        });
        this.selectedWorkout = new Workout("0", this.users[0], new Date(), WorkoutType.Strength, [], Intensity.Low);
  }

  getFullDescription(exercise:Exercise): string {
    return `${exercise.name} : ${exercise.description}. Intensity: ${exercise.intensity} Sets: ${exercise.sets}, Reps: ${exercise.reps}, Duration: ${exercise.duration} seconds.`;
  }
}
