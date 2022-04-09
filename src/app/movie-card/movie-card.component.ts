/**
 * The MovieCard component renders information about the complete movie collection retrieved from the myMusicMovies non-relational database.
 * @module MovieCardComponent
 */

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

  /**
   * API call to retrieve information about all movies
   * @function getMovies
   * @return A JSON object with all movies.
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  /**
   * Open a dialog box to render the GenreViewComponent
   * @function openGenreView
   * @param name {string}
   * @param description {string}
   */
  openGenreView(name: string, description: string): void {
    this.dialog.open(GenreViewComponent, {
      data: {
        name,
        description,
      },
      width: '450px',
    });
  }

  /**
  * Open a dialog box to render the DirectorViewComponent
  * @function openDirectorView
  * @param name {string}
  * @param bio {string}
  */
  openDirectorView(name: string, bio: string): void {
    this.dialog.open(DirectorViewComponent, {
      data: {
        name,
        bio,
      },
      width: '450px',
    });
  }

  /**
   * Open a dialog box to render the MovieDetailsComponent
   * @param title {string}
   * @param description {string}
   */
  openMovieDetails(title: string, description: string): void {
    this.dialog.open(MovieDetailsComponent, {
      data: {
        title,
        description,
      },
      width: '450px',
    });
  }

  /**
   * Function to fetch all FavoriteMovies of a user.
   * @function getFavorites
   * @param Username
   */
  getFavorites(): void {
    const user = localStorage.getItem('user');
    this.fetchApiData.getUser(user).subscribe((resp: any) => {
      this.favorites = resp.FavoriteMovies;
      console.log(this.favorites);
    });
  }

  /**
   * Function to add a single movie to a user's FavoriteMovies collection.
   * @function addFavorite
   * @param MovieID
   * @param Title
   * @returns A JSON object holding a single movie.
   */
  addFavorite(movieID: string, title: string): void {
    this.fetchApiData.addFavorite(movieID).subscribe(() => {
      this.snackBar.open(`"${title}" has been added to your favorites.`, 'OK', {
        duration: 4000,
      });
      this.ngOnInit();
    });
    return this.getFavorites();
  }

  /**
   * Function to remove a single movie from a user's FavoriteMovies collection.
   * @function noFavorite
   * @param MovieID
   * @param Title
   * @returns A JSON object holding a single movie.
   */
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

  /**
   * Function to check whether a movie is marked as a FavoriteMovie.
   * @function isFavorite
   * @param MovieID 
   * @returns boolean true or false
   */
  isFavorite(movieID: string): boolean {
    return this.favorites.some((movie) => movie._id === movieID);
    console.log(this.favorites.some((movie) => movie._id === movieID))
  }

  /**
   * Function to switch FavoriteMovies status of a single movie.
   * @function switchFavorite
   * @function noFavorite
   * @function addFavorite
   * @param MovieID 
   */
  switchFavorite(movie: any): void {
    this.isFavorite(movie._id)
      ? this.noFavorite(movie._id, movie.Title)
      : this.addFavorite(movie._id, movie.Title);
  }

}
