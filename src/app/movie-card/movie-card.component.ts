import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GenreViewComponent } from '../genre-view/genre-view.component';
import { DirectorViewComponent } from '../director-view/director-view.component';
import { MovieDetailsComponent } from '../movie-details/movie-details.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})

export class MovieCardComponent implements OnInit {
  movies: any[] = [];
  favorites: any[] = [];
  user: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getMovies();
    this.getFavorites();
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  openGenreView(name: string, description: string): void {
    this.dialog.open(GenreViewComponent, {
      data: {
        name,
        description,
      },
      width: '450px',
    });
  }

  openDirectorView(name: string, bio: string): void {
    this.dialog.open(DirectorViewComponent, {
      data: {
        name,
        bio,
      },
      width: '450px',
    });
  }

  openMovieDetails(title: string, description: string): void {
    this.dialog.open(MovieDetailsComponent, {
      data: {
        title,
        description,
      },
      width: '450px',
    });
  }

  getFavorites(): void {
    const user = localStorage.getItem('user');
    this.fetchApiData.getUser(user).subscribe((resp: any) => {
      this.favorites = resp.FavoriteMovies;
      console.log(this.favorites);
    });
  }

  addFavorite(movieID: string, title: string): void {
    this.fetchApiData.addFavorite(movieID).subscribe(() => {
      this.snackBar.open(`"${title}" has been added to your favorites.`, 'OK', {
        duration: 4000,
      });
      this.ngOnInit();
    });
    return this.getFavorites();
  }

  noFavorite(movieID: string, title: string): void {
    this.fetchApiData.deleteFavorite(movieID).subscribe((resp: any) => {
      console.log(resp);
      this.snackBar.open(
        `"${title}" has been removed from your favorites.`,
        'OK',
        {
          duration: 4000,
        }
      );
      this.ngOnInit();
    });
    return this.getFavorites();
  }

  isFavorite(movieID: string): boolean {
    return this.favorites.some((movie) => movie._id === movieID);
    console.log(this.favorites.some((movie) => movie._id === movieID))
  }

  switchFavorite(movie: any): void {
    this.isFavorite(movie._id)
      ? this.noFavorite(movie._id, movie.Title)
      : this.addFavorite(movie._id, movie.Title);
  }

}
