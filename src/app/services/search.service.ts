import { Injectable } from '@angular/core';
import { MovieService } from './movie-service.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor( private movieService: MovieService, private navigate: Router ) { }

  setFilterText(txt: string) {
    this.movieService.setFilterText(txt);
  }

}
