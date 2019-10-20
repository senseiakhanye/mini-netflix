import { Component, OnInit, OnChanges } from '@angular/core';
import { MovieService } from '../services/movie-service.service';
import { Imovie } from '../model/imovie';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnChanges {

  movies : Imovie[];
  filteredMovies: Imovie[];
  filterdString: string = "";

  constructor(private moviesService : MovieService) {
    moviesService.filterString$.subscribe( (newString: string) => {
      this.filterdString = newString;
      this.filterMovies();
    });
  }

  filterMovies() {
    if (this.filterdString !== "") {
      this.filteredMovies = this.movies.filter( (movie) => {
        return (movie.title.toLowerCase().includes(this.filterdString.toLowerCase()));
      });
      return ;
    }
    this.filteredMovies = this.movies.slice();
  }

  ngOnInit() {
    this.moviesService.getMovies().subscribe( (data) => {
      this.movies = data;
      this.filterMovies();
    })
  }

  openMovie(movie : Imovie) {
    console.log(movie);
  }

}
