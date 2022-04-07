# MusicMoviesAngularClient

The **Music Movies Angular Client** is the frontend component of the **myMusicMovies** web application based on its existing server-side code (RESTful Music Movies API and database) using the MEAN stack.

## User Stories

* As a user, I want to be able to receive information on movies, directors, and genres so that I can learn more about movies I have watched or am interested in.
* As a user, I want to be able to create a profile so I can save data about my favorite movies.

## Key Features
* Display a welcome view where users will be able to either log in or register for their account.
* Once authenticated, the user should be presented with all movies.
* Upon clicking on a particular movie, users will be taken to a single movie view, where additional movie details will be displayed. The single movie view will contain the following additional features:
  * A button that when clicked takes a user to the **director view**, where details about the director of that particular movie will be displayed.
  * A button that when clicked takes a user to the **genre view**, where details about that particular genre of the movie will be displayed.

## Technical Specifications
* Application is written in Angular (version 9 or later)
* Application requires the latest version of Node.js and npm package
* Application contains user registration and login forms
* Application is designed using Angular Material
* Application's codebase contains comments using Typedoc
* Project contains technical documentation using Typedoc
* Project is hosted on GitHub Pages

## Built with
The **My Music Movies** web application is built using the MEAN stack:
* MongoDB
* Express.js
* Angular
* Node.js

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.3.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Acknowledgements

This project was built as part of the mentored CareerFoundry Full-Stack Web Development Program / Achievement 6/6 / Collaboration & Documentation: https://careerfoundry.com/en/courses/become-a-web-developer/
