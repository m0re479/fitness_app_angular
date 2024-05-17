import { Component } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { Gender } from '../../enums/gender.enum';
import { User } from '../../models/user.model';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { UsersService } from '../../services/users.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [FormsModule, NgIf, NgFor, DatePipe, RouterModule],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  users: User[] = [];
  static ID = 1;
  genders = Object.values(Gender);
  newUser: User = new User("0", '', '', '', Gender.Male, new Date(), 0, 0);
  
  constructor(private usersService:UsersService, 
    private router:Router) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.usersService.getAll().subscribe((data) => {
      this.users = data;
      let maxId = 0;
      let id = 0;
      for (let i=0; i<this.users.length; i++) {
        id = Number(this.users[i].id);
        if (id > maxId) {maxId = id;}
      }
      UsersComponent.ID = maxId + 1;
    });
  }

  addUser(form: NgForm) {
    if (this.newUser.dateOfBirth === null) this.newUser.dateOfBirth = new Date();
    if (form.valid) {
      const userToAdd = new User(
        String(UsersComponent.ID++),
        this.newUser.firstName,
        this.newUser.lastName,
        this.newUser.email,
        this.newUser.gender,
        this.newUser.dateOfBirth,
        this.newUser.weight,
        this.newUser.height
      );

      this.usersService.createUser(userToAdd).subscribe({
        next:(data) => {
          this.users.push(data);
          this.router.navigate(["/Users"]);
        },
        error:(err) => {
          console.log(err);
        }
      });
      console.log('Added user:', this.newUser);
      form.reset();
      this.newUser = new User("0", '', '', '', Gender.Male, new Date(), 0, 0);
    }
  }

  deleteUser(id: string) {
    this.usersService.delete(id).subscribe({
      next: () => {
        const userIndex = this.users.findIndex((user) => user.id === id);
        if (userIndex !== -1) {
          this.users.splice(userIndex, 1);
        }
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  getAge(user:User): number {
    const today = new Date();
    const birthDate = new Date(user.dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth() - birthDate.getMonth();
    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  calculateBMR(user:User): number {
    const age = this.getAge(user);
    if (user.gender === Gender.Male) {
      return 88.362 + (13.397 * user.weight) + (4.799 * user.height) - (5.677 * age);
    } else {
      return 447.593 + (9.247 * user.weight) + (3.098 * user.height) - (4.330 * age);
    }
  }
}