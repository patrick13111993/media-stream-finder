import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  error: string = null;
  loading = false;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)])
    });
  }

  onSubmit() {
    this.loading = true;
    const email = this.registerForm.value.email;
    const password = this.registerForm.value.password;

    this.authService.signUp(email, password).subscribe(
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
    if (this.registerForm.get('email').errors?.required) {
      return "Please enter an email address"
    }
    else if (this.registerForm.get('email').errors?.email) {
      return "Invalid email address"
    }
    else {
      return "Sorry, something went wrong..."
    }
  }

  getPasswordError(): string {
    if (this.registerForm.get('password').errors?.required) {
      return "Please enter a password"
    }
    if (this.registerForm.get('password').errors?.minlength) {
      return "Passwords must be " + this.registerForm.get('password').errors?.minlength.requiredLength + " characters or more (" + this.registerForm.get('password').errors?.minlength.actualLength + " entered)"
    }
    else {
      return "Sorry, something went wrong..."
    }
  }

}
