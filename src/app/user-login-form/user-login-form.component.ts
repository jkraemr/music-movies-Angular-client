import { Component, OnInit, Input } from '@angular/core';
// Close dialog on success
import { MatDialogRef } from '@angular/material/dialog';
// Import custom API calls 
import { FetchApiDataService } from '../fetch-api-data.service';
// Display notifications back to user
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})

export class UserLoginFormComponent implements OnInit {

  @Input() userData = { Username: '', Password: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  // Function to send login form inputs to backend
  loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe((response) => {
      localStorage.setItem('user', response.user.Username);
      localStorage.setItem('token', response.token);
      // Close dialog modal on success
      this.dialogRef.close();
      console.log(response);
      this.snackBar.open('Sucess! You are now logged in.', 'OK', {
        duration: 10000,
      });
    }, (response) => {
      console.log(response)
      this.snackBar.open('Something went wrong. Please check your login credentials and try again.', 'OK', {
        duration: 10000
      });
    });
  }

}