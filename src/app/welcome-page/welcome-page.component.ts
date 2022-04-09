/**
 * The WelcomePageComponent serves as the start page providing the possibility to login or register for a new account.
 * @module WelcomePageComponent
 */

import { Component, OnInit } from '@angular/core';
import { UserLoginFormComponent } from '../user-login-form/user-login-form.component';
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})

export class WelcomePageComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void { }

  /**
 * Open dialog when login button is clicked.
 * @module UserLoginFormComponent
 */
  openUserLoginDialog(): void {
    this.dialog.open(UserLoginFormComponent, {
      // Assigning the dialog a width
      width: '300px'
    });
  }

  /**
   * Open dialog when registration button is clicked.
   * @module UserRegistrationFormComponent
   */
  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
      // Assigning the dialog a width
      width: '300px'
    });
  }

}
