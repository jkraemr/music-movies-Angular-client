import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { UserEditComponent } from '../user-edit/user-edit.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})

export class UserProfileComponent implements OnInit {
  user: any = {};
  Username = localStorage.getItem('user');

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    public router: Router) { }

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    const user = localStorage.getItem('user');
    if (user) {
      this.fetchApiData.getUser(user).subscribe((res: any) => {
        this.user = res;
        console.log(this.user);
        return this.user;
      });
    }
  }

  deleteUser(): void {
    const user = localStorage.getItem('user');
    this.fetchApiData.deleteUser().subscribe(() => { });
    this.snackBar.open(`Your user account has been deleted.`, 'OK', {
      duration: 5000,
    });
    localStorage.clear();
    setTimeout(() => this.router.navigate(['welcome']), 500);
  }

  editUser(): void {
    this.dialog.open(UserEditComponent, {
      width: '300px',
    });
  }

}