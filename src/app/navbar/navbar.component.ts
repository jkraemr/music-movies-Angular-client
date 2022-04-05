import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit {

  constructor(
    public router: Router,
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialogModule,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  Movies(): void {
    this.router.navigate(['movies']);
  }

  Profile(): void {
    this.router.navigate(['account']);
  }

  logOut(): void {
    localStorage.clear();
    this.snackBar.open('You are now logged out.', 'OK', {
      duration: 5000,
    });
    this.router.navigate(['welcome']);
  }

}
