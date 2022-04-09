/**
 * The UserEditComponent provides user profile editing capabilites.
 * @module UserEditComponent
 */

import { Component, OnInit, Input, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})

export class UserEditComponent implements OnInit {
  user: any = {};
  Username = localStorage.getItem('user');

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserEditComponent>,
    public snackBar: MatSnackBar
  ) { }

  /**
   * Binding input values to the userData object
   */
  @Input() userData = {
    Username: this.user.Username,
    Password: this.user.Password,
    Email: this.user.Email,
    Birthday: this.user.Birthday,
  };

  ngOnInit(): void {
    this.getUser();
  }

  /**
   * Get user data
   *  @function getUser
   */
  getUser(): void {
    const user = localStorage.getItem('user');
    this.fetchApiData.getUser(user).subscribe((resp: any) => {
      this.user = resp;
    });
  }

  /**
   * Edit user data
   *  @function editUser
   */
  editUser(): void {
    this.fetchApiData.editUser(this.userData).subscribe((resp) => {
      this.dialogRef.close();
      localStorage.setItem('user', this.userData.Username);
      this.snackBar.open('Your profile has been updated successfully.', 'OK', {
        duration: 2000,
      });
      function reloadwindow() {
        location.reload();
      }
      setTimeout(reloadwindow, 2200);
    });
  }

}
