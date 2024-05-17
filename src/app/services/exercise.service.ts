import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Exercise } from "../models/exercise.model";

@Injectable({
    providedIn: 'root'
})
export class ExerciseService {
    private myServUrl = 'http://localhost:3001/exercises';

    constructor(private http: HttpClient){}

    getAll() : Observable<Exercise[]> {
        return this.http.get<Exercise[]>(this.myServUrl);
    }

    createExercise(e:Exercise) {
        return this.http.post<Exercise>(this.myServUrl, e);
    }

    getById(id: string) : Observable<Exercise> {
        return this.http.get<Exercise>(`${this.myServUrl}/${id}`);    
    }
        
    update(e:Exercise) {
        return this.http.put(`${this.myServUrl}/${e.id}`, e);
    }

    delete(id: string) {
        return this.http.delete<void>(`${this.myServUrl}/${id}`);
    }
}