import { Component, OnInit, Input } from '@angular/core';
// Close dialog on success
import { MatDialogRef } from '@angular/material/dialog';
// Import custom API calls 
import { FetchApiDataService } from '../fetch-api-data.service';
// Display notifications back to user
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss']
})

export class UserRegistrationFormComponent implements OnInit {

  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  // Function to send registration form inputs to backend
  registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe((response) => {
      // Close dialog modal on success
      this.dialogRef.close();
      console.log(response);
      this.snackBar.open('Sucess! You are now registered.', 'OK', {
        duration: 10000
      });
    }, (response) => {
      console.log(response)
      this.snackBar.open('Something went wrong. Please check your registration entries and try again.', 'OK', {
        duration: 10000
      });
    });
  }

}