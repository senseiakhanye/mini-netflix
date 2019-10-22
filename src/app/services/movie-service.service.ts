import { Injectable } from '@angular/core';
import { Imovie } from '../model/imovie';
import { Observable, of, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private MOVIES: Imovie[] = [
    {
      guid:"f4c7fa27-6a06-452e-aa57-75cca71c2eb4", 
      title : "Dawn of the planet of the apes",
      year: 2001,
      image: "https://peruzal-parse-media.s3.amazonaws.com/c6b7a11f-d1cb-427f-b784-4475f033fc48_1.jpg",
      favourite: false
    },
    {
      guid:"0cf69477-40f0-43b8-8e52-e5a14a59e059", 
      title : "X-Men",
      year: 2001,
      image: "https://peruzal-parse-media.s3.amazonaws.com/652565bb-02ad-487f-929e-78308085ca1e_4.jpg",
      favourite: false
    },
    {
      guid:"f6b67a66-c8d1-4415-bb85-b14e23972e26", 
      title : "Despicable 3",
      year: 2001,
      image: "https://peruzal-parse-media.s3.amazonaws.com/43b8cf94-8074-4e72-b58f-de6a3d067464_11.jpg",
      favourite: false
    },
    {
      guid:"7659b9b0-0d4d-4e51-84ff-5b29e54ed06d", 
      title : "A bugs lie",
      year: 2001,
      image: "https://peruzal-parse-media.s3.amazonaws.com/92b4aed5-ef06-4065-af9a-1bb65e3d36d5_13.jpg",
      favourite: false
    },
    {
      guid:"26260781-6b4b-4635-a7f7-ae6fe5dcfa02", 
      title : "District 9",
      year: 2001,
      image: "https://peruzal-parse-media.s3.amazonaws.com/7a53a11c-9dae-48b4-ac36-38916bcf0096_2.jpg",
      favourite: false
    }
  ]
  movies: Imovie[]
  filterString$: Observable<string>;
  private filterSubject: Subject<string>;
  showFavourite$: Observable<boolean>;
  favouriteStatus: boolean = false;
  private favouriteSubject: Subject<boolean>;

  constructor() {
    this.filterSubject = new Subject<string>();
    this.filterString$ = this.filterSubject.asObservable();
    this.favouriteSubject = new Subject<boolean>();
    this.showFavourite$ = this.favouriteSubject.asObservable();
    let localMovies = sessionStorage.getItem("movies");
    if (localMovies === undefined || localMovies === null) {
      sessionStorage.setItem("movies", JSON.stringify(this.MOVIES));
    }
  }

  setFilterText(searchString: string) {
    this.filterSubject.next(searchString);
  }

  toggleFavourite() {
    this.favouriteStatus = !this.favouriteStatus;
    this.favouriteSubject.next(this.favouriteStatus);
  }

  getMovies(): Observable<Imovie[]> {
    this.movies = JSON.parse(sessionStorage.getItem("movies"));
    return of(this.movies);
  }

  getMovie(movieId: string): Imovie {
    return this.movies.find( movie => movie.guid === movieId);
  }

  toggleLikeMovie(movie: Imovie): Observable<boolean> {
    movie.favourite = !movie.favourite;
    sessionStorage.setItem("movies", JSON.stringify(this.movies));
    return of(true);
  }

  showAll() {
    this.favouriteStatus = false;
    this.favouriteSubject.next(this.favouriteStatus);
  }
}