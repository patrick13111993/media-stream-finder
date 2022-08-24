import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  error: string = null;
  loading = false;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required])
    });
  }

  onSubmit() {
    this.loading = true;
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;

    this.authService.login(email, password).subscribe(
      (response) => {
        this.loading = false;
      },
      (error) => {
        this.error = error;
        this.loading = false;
      }
    )
  }

  getEmailError(): string {
    if (this.loginForm.get('email').errors?.required) {
      return "Please enter an email address"
    }
    else if (this.loginForm.get('email').errors?.email) {
      return "Invalid email address"
    }
    else {
      return "Sorry, something went wrong..."
    }
  }

  getPasswordError(): string {
    if (this.loginForm.get('password').errors?.required) {
      return "Please enter a password"
    }
    if (this.loginForm.get('password').errors?.minlength) {
      return "Passwords must be " + this.loginForm.get('password').errors?.minlength.requiredLength + " characters or more (" + this.loginForm.get('password').errors?.minlength.actualLength + " entered)"
    }
    else {
      return "Sorry, something went wrong..."
    }
  }

}
