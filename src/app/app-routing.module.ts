import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MovieItemComponent } from './movie-item/movie-item.component';
import { NotfoundComponent } from './notfound/notfound.component';

const routes: Routes = [ 
  { path: '', redirectTo:'/movies', pathMatch: 'full'},
  { path: 'movies' , component: HomeComponent },
  { path: 'movies/:movieid', component: MovieItemComponent },
  { path: '**', component: NotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
