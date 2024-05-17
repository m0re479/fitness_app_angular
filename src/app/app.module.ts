import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { WorkoutComponent } from './components/workout/workout.component';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { ExerciseComponent } from './components/exercise/exercise.component';
import { UsersComponent } from './components/users/users.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { ExerciseEditComponent } from './components/exercise-edit/exercise-edit.component';
import { WorkoutEditComponent } from './components/workout-edit/workout-edit.component';

const appRoutes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'Exercises', component: ExerciseComponent},
    {path: 'Workouts', component: WorkoutComponent},
    {path: 'Users', component: UsersComponent},
    {path: 'Users/:id', component: UserProfileComponent},
    {path: 'Exercises/:id', component: ExerciseEditComponent},
    {path: 'Workouts/:id', component: WorkoutEditComponent},
    {path: '**', redirectTo: '/'}
  ];

@NgModule({
  declarations: [
    AppComponent
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    HomeComponent,
    WorkoutComponent,
    ExerciseComponent,
    HttpClientModule,
    UsersComponent,
    ExerciseEditComponent,
    WorkoutEditComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }