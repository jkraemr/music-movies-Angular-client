/**
 * The FetchApiDataService handles all HTTP requests to the Music Movies API to retrieve movie and user data as well as to register and login users, update their profile, and add or remove movies from their FavoriteMovies list.
 * @module FetchApiDataService
 */

import { Injectable } from '@angular/core';
// import { catchError } from 'rxjs/internal/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, catchError } from 'rxjs';
import { map } from 'rxjs/operators';

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://mymusicmovies.herokuapp.com/';

@Injectable({
  providedIn: 'root'
})

export class FetchApiDataService {

  /**
  * Inject the HttpClient module to the constructor params.
  * This will provide the HttpClient module to the entire class, making it available via this.http
  * @param http 
  */
  constructor(private http: HttpClient) { }

  /**
   * User registration endpoint API call.
   * Sends a POST request to register a new user.
   * @function userRegistration
   * @param userDetails An object containing the user's username, password, email and birthday.
   * @returns An Observable that represents either a JSON object with the new user's details or an error if the request was unsuccessful.
   */
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(apiUrl + 'register', userDetails).pipe(
        catchError(this.handleError)
      );
  }

  /**
   * User login endpoint API call.
   * Sends a POST request to log in a user.
   * @function userLogin
   * @param userDetails An object containing the user's username and password.
   * @returns A JSON object with the user's details and a web token which is used to handle all further requests to protected resources, or an error if the request was unsuccessful.
   */
  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(apiUrl + 'login', userDetails).pipe(
        catchError(this.handleError)
      );
  }

  /**
  * Get all movies endpoint API call.
  * Sends a GET request to fetch details for all movies.
  * @function getAllMovies
  * @returns A JSON object with data for all movies or an error if the request was unsuccessful.
  */
  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies', {
        headers: new HttpHeaders({ Authorization: 'Bearer ' + token, }),
      })
      .pipe(map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  /**
  * Get single movie endpoint API call.
  * Sends a GET request to fetch details for a single movie.
  * @function getMovie
  * @param Title
  * @returns A JSON object with data for a single movie or an error if the request was unsuccessful.
  */
  getMovie(title: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies/:Title', {
        headers: new HttpHeaders({ Authorization: 'Bearer ' + token, }),
      })
      .pipe(map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  /**
   * Get director endpoint API call.
   * Sends a GET request to fetch details for a single director.
   * @function getDirector
   * @param Name 
   * @returns A JSON object with data for a single director or an error if the request was unsuccessful.
   */
  getDirector(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'directors/:Name', {
        headers: new HttpHeaders({ Authorization: 'Bearer ' + token, }),
      })
      .pipe(map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  /**
   * Get genre endpoint API call.
   * Sends a GET request to fetch details for a genre.
   * @function getGenre
   * @param Name 
   * @returns A JSON object with data for a genre or an error if the request was unsuccessful.
   */
  getGenre(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'genres/:Name', {
        headers: new HttpHeaders({ Authorization: 'Bearer ' + token, }),
      })
      .pipe(map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  /**
   * Get user endpoint API call.
   * Sends a GET request to fetch details for a single user.
   * @function getUser
   * @param username Username of a logged in user.
   * @returns A JSON object with the user's details or an error if the request was unsuccessful.
   */
  getUser(username: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + `users/${username}`, {
        headers: new HttpHeaders({ Authorization: 'Bearer ' + token, }),
      })
      .pipe(map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  /**
   * Get favorite movies for a user endpoint API call.
   * Sends a GET request to fetch all FavoriteMovies of a single user.
   * @function getFavorites
   * @param Username 
   * @returns A JSON object with the user's FavoriteMovies or an error if the request was unsuccessful.
   */
  getFavorites(Username: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + `users/${Username}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Add movie to FavoriteMovies endpoint API call.
   * Sends a POST request to add a movie to the user's FavoriteMovies.
   * @function addFavorite
   * @param username Username of the logged in user.
   * @param MovieID ID of the movie to be added to the user's FavoriteMovies array.
   * @returns A JSON object with details of the user's updated FavoriteMovies or an error if the request was unsuccessful.
   */
  addFavorite(MovieID: any): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http
      .post(apiUrl + `users/${username}/movies/${MovieID}`, null, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Sends a DELETE request to delete a movie from the user's FavoriteMovies.
   * @function deleteFavorite
   * @param MovieID ID of the movie to be deleted from the user's FavoriteMovies.
   * @param username Username of the logged in user.
   * @returns A JSON object with updated data of the user's FavoriteMovies or an error if the request was unsuccessful.
   */
  deleteFavorite(MovieID: any): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http
      .delete(apiUrl + `users/${username}/movies/${MovieID}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Edit user endpoint API call.
   * Sends a PATCH request to update the user's details.
   * @param userDetails An object containing the user's username, password, email and birthday.
   * @returns A JSON object with the user's details, updated to reflect the changes requested, or the error if the request is unsuccessful.
   */
  editUser(userDetails: object): Observable<any> {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    return this.http
      .patch(apiUrl + `users/${user}`, userDetails, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }


  /**
   * Delete user endpoint API call.
   * Sends a DELETE request to delete the user data.
   * @param user Username of the logged in user.
   * @returns A text message confirming that the user has been successfully or an error if the request was unsuccessful.
   */
  public deleteUser(): Observable<any> {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    return this.http
      .delete(apiUrl + `users/${user}`, {
        headers: new HttpHeaders(
          {
            Authorization: 'Bearer ' + token,
          })
      }).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  /**
   * Extract data response.
   * Takes a request response and returns either the response body or an empty object.
   * @param res The response to an Http request.
   * @returns Either the response or an empty object.
   */
  private extractResponseData(data: any | Object): any {
    return data || {};
  }

  /**
   * Handle error function.
   * Handles error responses to Http requests.
   * @param error The HttpErrorReponse returned on the Observable's response stream.
   * @returns An observable that errors with the specified message.
   */
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    return throwError('Something went wrong :/ Please try again later.');
  }
}
