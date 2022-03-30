import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserLoginFormComponent } from './user-login-form/user-login-form.component';
import { UserRegistrationFormComponent } from './user-registration-form/user-registration-form.component';
import { MovieCardComponent } from './movie-card/movie-card.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'music-movies-Angular-client';

  constructor(public dialog: MatDialog) { }

  // Open dialog when login button is clicked  
  openUserLoginDialog(): void {
    this.dialog.open(UserLoginFormComponent, {
      // Assigning the dialog a width
      width: '300px'
    });
  }

  // Open dialog when registration button is clicked  
  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
      // Assigning the dialog a width
      width: '300px'
    });
  }

  openMoviesDialog(): void {
    this.dialog.open(MovieCardComponent, {
      width: '500px'
    });
  }

}
