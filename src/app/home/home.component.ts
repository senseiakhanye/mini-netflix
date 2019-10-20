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
  changeDetected: boolean;

  constructor(private moviesService : MovieService) {
    moviesService.changeDetect$.subscribe( (newBool: boolean) => {
      console.log("reading data");
      this.changeDetected = newBool;
    });
  }

  ngOnInit() {
    this.moviesService.getMovies().subscribe( (data) => {
      this.movies = data;
      if (this.moviesService.filterMovies()) {
        console.log("filter movies");
        this.filteredMovies = this.movies.filter( (movie) => {
          return movie.title.toLowerCase().includes(this.moviesService.filterString.toLowerCase());
        });
        return ;
      }
      console.log("No filter required");
      this.filteredMovies = this.movies.slice();
      console.log(this.filteredMovies);
    })
  }

  ngOnChanges() {
    console.log("Change detected");
  }

  openMovie(movie : Imovie) {
    console.log(movie);
  }

}
