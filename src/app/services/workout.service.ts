import { Injectable } from '@angular/core';
import { Workout } from '../models/workout.model';
import { Exercise } from '../models/exercise.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {
  //private workouts: Workout[] = [];

  private myServUrl = 'http://localhost:3002/workouts';

  constructor(private http: HttpClient){}

    getAll() : Observable<Workout[]> {
        return this.http.get<Workout[]>(this.myServUrl);
    }

    createWorkout(w:Workout) {
        return this.http.post<Workout>(this.myServUrl, w);
    }

    getById(id: string) : Observable<Workout> {
        return this.http.get<Workout>(`${this.myServUrl}/${id}`);    
    }
        
    update(w:Workout) {
        return this.http.put(`${this.myServUrl}/${w.id}`, w);
    }

    delete(id: string) {
        return this.http.delete<void>(`${this.myServUrl}/${id}`);
    }

    getUsers()  : Observable<User[]>{
      return this.http.get<User[]>('http://localhost:3000/users');
    }

    getExercises(): Observable<Exercise[]>{
      return this.http.get<Exercise[]>('http://localhost:3001/exercises');
    }
}