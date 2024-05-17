import { Gender } from "../enums/gender.enum";

export class User {
  constructor(
    public id: string,
    public firstName: string,
    public lastName: string,
    public email: string,
    public gender: Gender,
    public dateOfBirth: Date,
    public weight: number,
    public height: number
  ) {}

  updateProfile(updatedData: Partial<User>): void {
    Object.assign(this, updatedData);
  }

  // updateProfile(updatedData: Partial<User>): void {
  //   this.id = updatedData.id ?? this.id;
  //   this.firstName = updatedData.firstName ?? this.firstName;
  //   this.lastName = updatedData.lastName ?? this.lastName;
  //   this.email = updatedData.email ?? this.email;
  //   this.gender = updatedData.gender ?? this.gender;
  //   this.dateOfBirth = updatedData.dateOfBirth ?? this.dateOfBirth;
  //   this.weight = updatedData.weight ?? this.weight;
  //   this.height = updatedData.height ?? this.height;
  // }
}