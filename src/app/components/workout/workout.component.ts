import { Component, OnInit } from '@angular/core';
import { WorkoutService } from '../../services/workout.service';
import { Workout } from '../../models/workout.model';
import { Exercise } from '../../models/exercise.model';
import { Intensity } from '../../enums/intensity.enum';
import { WorkoutType } from '../../enums/workoutType.enum';
import { User } from '../../models/user.model';
import { FormsModule, NgForm } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-workout-details',
  standalone: true,
  imports: [FormsModule, NgFor, NgIf, RouterModule],
  templateUrl: './workout.component.html',
  styleUrl: './workout.component.css'
})
export class WorkoutComponent {
  workouts: Workout[] = [];
  static ID: number = 1;
  intensities = Object.values(Intensity);
  workoutTypes = Object.values(WorkoutType);
  exercises: Exercise[] = []; // Возьмём упражнения из файла с упражнениями
  users: User[] = []; // Возьмём пользователей из файла с пользователями
  newWorkout: Workout = new Workout("0", this.users[0], new Date(), WorkoutType.Strength, [], Intensity.Low);

  constructor(private workoutService: WorkoutService,
    private router:Router) {}

  getAllExercises() {
    this.workoutService.getExercises().subscribe((data) => {
      this.exercises = data;
    });
  }

  getAllUsers() {
    this.workoutService.getUsers().subscribe((data) => {
      this.users = data;
      if (this.users.length > 0) {
        this.newWorkout.user = this.users[0]; // Устанавливаем первого пользователя по умолчанию
      }
    });
  }

  ngOnInit(): void {
    this.getWorkouts();
    this.getAllUsers();
    this.getAllExercises();
  }

  getWorkouts() {
    this.workoutService.getAll().subscribe((data) => {
      this.workouts = data;
      let maxId = 0;
      let id = 0;
      for (let i=0; i<this.users.length; i++) {
        id = Number(this.users[i].id);
        if (id > maxId) {maxId = id;}
      }
      WorkoutComponent.ID = maxId + 1;    
    });
  }

  addWorkout(form: NgForm) {
    if (this.newWorkout.dateTime === null) this.newWorkout.dateTime = new Date();
    if (form.valid) {
      const workoutToAdd = new Workout(
        String(WorkoutComponent.ID++), 
        this.newWorkout.user,
        this.newWorkout.dateTime, 
        this.newWorkout.type, 
        this.newWorkout.exercises, 
        this.newWorkout.intensity
      );

      this.workoutService.createWorkout(workoutToAdd).subscribe({
        next:(data) => {
          this.workouts.push(data);
          this.router.navigate(["/Workouts"]);
        },
        error:(err) => {
          console.log(err);
        }
      });
      console.log("Added workout:", this.newWorkout);
      form.reset();
      this.newWorkout = new Workout("0", this.users[0], new Date(), WorkoutType.Strength, [], Intensity.Low);
    }
  }

  addExerciseToWorkout(exercise: Exercise, event: Event) {
    event.preventDefault(); // Предотвращение отправки формы
    this.newWorkout.addExercise(exercise);
  }

  removeExerciseFromWorkout(index: number, event: Event) {
    event.preventDefault(); // Предотвращение отправки формы
    this.newWorkout.removeExercise(String(index));
  }

  deleteWorkout(id: string) {
    this.workoutService.delete(id).subscribe({
      next: () => {
        const workoutIndex = this.workouts.findIndex((workout) => workout.id === id);
        if (workoutIndex !== -1) {
          this.workouts.splice(workoutIndex, 1);
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

  getFullUserName(workout:Workout) {
    return `${workout.user.firstName} ${workout.user.lastName}`;  
  }
}
