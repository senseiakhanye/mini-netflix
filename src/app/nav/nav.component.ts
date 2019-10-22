import { Component, OnInit } from '@angular/core';
import { SearchService } from '../services/search.service';
import { MovieService } from '../services/movie-service.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(
    private searchService: SearchService, 
    private movieService: MovieService) { 
      movieService.showFavourite$.subscribe( (data) => {
        this.homeActive = data;
      })
    }

  homeActive: boolean = false;

  ngOnInit() {
  }

  searchMovies(txtSearch: any) {
    this.searchService.setFilterText(txtSearch);
  }

  showFavourites() {
    this.movieService.toggleFavourite();
  }

  showAll() {
    this.movieService.showAll();
  }
  
}
