import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { User } from "../models/user.model";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class UsersService {
    private myServUrl = 'http://localhost:3000/users';

    constructor(private http: HttpClient){}

    getAll() : Observable<User[]> {
        return this.http.get<User[]>(this.myServUrl);
    }

    createUser(u:User) {
        return this.http.post<User>(this.myServUrl, u);
    }

    getById(id: string) : Observable<User> {
        return this.http.get<User>(`${this.myServUrl}/${id}`);    
    }
        
    update(u:User) {
        return this.http.put(`${this.myServUrl}/${u.id}`, u);
    }

    delete(id: string) {
        return this.http.delete<void>(`${this.myServUrl}/${id}`);
    }
}