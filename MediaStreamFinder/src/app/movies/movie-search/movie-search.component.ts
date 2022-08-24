import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-movie-search',
  templateUrl: './movie-search.component.html',
  styleUrls: ['./movie-search.component.css']
})
export class MovieSearchComponent implements OnInit {

  searchMovieForm: FormGroup;

  constructor(private movieService: MovieService, private router: Router) { }

  ngOnInit(): void {
    this.searchMovieForm = new FormGroup({
      'title': new FormControl(null, Validators.required)
    })
  }

  onSearch() {
    let searchString: string = encodeURIComponent(this.searchMovieForm.value.title).replace('%20', '+');
    this.router.navigate(['/movie/', searchString]);
  }

}
