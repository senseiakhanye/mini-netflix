import { Component, OnInit } from '@angular/core';
import { MovieService } from '../services/movie-service.service';
import { Imovie } from '../model/imovie';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  movies : Imovie[];

  constructor(private moviesService : MovieService) { }

  ngOnInit() {
    this.moviesService.getMovies().subscribe( (data) => {
      this.movies = data;
    })
  }

  openMovie(movie : Imovie) {
    console.log(movie);
  }
}
