/**
 * The AppComponent is the root component which is rendered in the index.html file and is the parent
 * component for the app. Its template renders a router-outlet element, that displays content defined 
 * by the routes in the app-routing-module.
 * @module AppComponent
 */

import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'music-movies-Angular-client';
}