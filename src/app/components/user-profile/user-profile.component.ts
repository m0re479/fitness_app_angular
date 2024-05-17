import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { FormsModule } from '@angular/forms';
import { Gender } from '../../enums/gender.enum';
import { UsersService } from '../../services/users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [FormsModule, NgIf, NgFor],
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  users: User[] = [];
  genderEnum = Object.values(Gender);
  selectedUser: User = new User("0", '', '', '', Gender.Male, new Date(), 0, 0);
  id: string = "0";

  constructor( private route: ActivatedRoute,
    private router:Router, private usersService: UsersService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((param) => {
      this.id = String(param.get('id'));
      this.getById(this.id);
    });
  }

  getById(id: string) {
    this.usersService.getById(id).subscribe((data) => {
      this.selectedUser = data;
    });
  }

  updateUser() {
  this.usersService.update(this.selectedUser).subscribe({
    next: (data) => {
      this.selectedUser.updateProfile(data);
      this.router.navigate(["/Users"])
    },
    error: (err) => {
      console.log(err);
    }
  });
  this.selectedUser = new User("0", '', '', '', Gender.Male, new Date(), 0, 0);
  }
}