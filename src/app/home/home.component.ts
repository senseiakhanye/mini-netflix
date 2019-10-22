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
  filteredMovies: Imovie[];
  filterdString: string = "";
  favourites: boolean = false;
  contentFound: boolean = false;

  constructor(private moviesService : MovieService) {
    moviesService.filterString$.subscribe( (newString: string) => {
      this.filterdString = newString;
      this.filterMovies();
    });
    moviesService.showFavourite$.subscribe( (showFavourite: boolean) => {
      this.favourites = showFavourite;
      this.filterMovies();
    })

  }

  filterMovies() {
    if (this.filterdString !== "") {
      if (this.favourites) {
        this.filteredMovies = this.movies.filter( (movie) => {
          return (movie.title.toLowerCase().includes(this.filterdString.toLowerCase()) && movie.favourite);
        });
        this.contentFound = (this.filteredMovies.length > 0);
        return this.filteredMovies;
      }
      this.filteredMovies = this.movies.filter( (movie) => {
          return (movie.title.toLowerCase().includes(this.filterdString.toLowerCase()));
        });
      this.contentFound = (this.filteredMovies.length > 0);
      return this.filteredMovies;
    }
    if (!this.favourites) {
      this.contentFound = this.movies.length > 0;
      return this.filteredMovies = this.movies;
    }
    this.filteredMovies = this.movies.filter( (movie) => movie.favourite );
    this.contentFound = this.filteredMovies.length > 0;
  }

  ngOnInit() {
    console.log("On init called");
    this.moviesService.getMovies().subscribe( (data) => {
      this.movies = data;
      this.filterMovies();
    })
  }

  openMovie(movie : Imovie) {
    console.log(movie);
  }

  likeVieo(movie: Imovie)  {
    this.moviesService.toggleLikeMovie(movie).subscribe( (success) => {
      this.filterMovies();
    });
  }
}
