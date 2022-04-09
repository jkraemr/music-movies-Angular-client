/**
 * The MovieCard component renders information about a single movie retrieved from the myMusicMovies non-relational database.
 * @module MovieCardComponent
 */

import { Component, OnInit, Inject } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog'

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {
  /**
   *
   * @param data
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      title: string;
      description: string;
    }
  ) { }

  ngOnInit(): void { }

}
