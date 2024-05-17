import { Component, OnInit } from '@angular/core';
import { Exercise } from '../../models/exercise.model';
import { Intensity } from '../../enums/intensity.enum';
import { ActivatedRoute, Router } from '@angular/router';
import { ExerciseService } from '../../services/exercise.service';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-exercise-edit',
  standalone: true,
  imports: [FormsModule, NgIf, NgFor],
  templateUrl: './exercise-edit.component.html',
  styleUrl: './exercise-edit.component.css'
})
export class ExerciseEditComponent implements OnInit {
  exercises: Exercise[] = [];
  selectedExercise: Exercise = new Exercise("1", "", "", 1, 1, 1, 1, Intensity.Low);
  intensities = Object.values(Intensity);
  id: string = "0";

  constructor( private route: ActivatedRoute,
    private router:Router, private exerciseService:ExerciseService) {}
  ngOnInit(): void {
    this.route.paramMap.subscribe((param) => {
      this.id = String(param.get('id'));
      this.getById(this.id);
    });  
  }

  getById(id: string) {
    this.exerciseService.getById(id).subscribe((data) => {
      this.selectedExercise = data;
    });
  }

  updateExercise() {
    this.exerciseService.update(this.selectedExercise).subscribe({
      next: (data) => {
        this.selectedExercise.updateExercise(data);
        this.router.navigate(["/Exercises"])
      },
      error: (err) => {
        console.log(err);
      }
    });
    this.selectedExercise = new Exercise("1", "", "", 1, 1, 1, 1, Intensity.Low);
  }
}
