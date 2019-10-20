import { Component, OnInit } from '@angular/core';
import { MovieService } from '../services/movie-service.service';
import { Imovie } from '../model/imovie';
import { ActivatedRoute, Router } from '@angular/router';
import { isComponentView } from '@angular/core/src/view/util';

@Component({
  selector: 'app-movie-item',
  templateUrl: './movie-item.component.html',
  styleUrls: ['./movie-item.component.css']
})
export class MovieItemComponent implements OnInit {

  movie: Imovie;
  tempMovie: Imovie;
  guid: string;
  ready: boolean = false;

  constructor( 
    private movieService: MovieService,
    private route: ActivatedRoute,
    private navigator: Router) { }

  ngOnInit() {
    this.guid = this.route.snapshot.params['movieid'];
    if ((this.tempMovie = this.movieService.getMovie(this.guid)) === undefined) {
      return this.navigator.navigate(['/notfound']);
    }
    this.ready = true;
    this.movie = this.movieService.getMovie(this.guid);
    console.log(this.movie);
  }
}
