import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthResponse } from '../authResponse.model';
import { AuthService } from '../auth.service';

@Component({
  selector: 'auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  isLoginmode: boolean = true;
  loading: boolean = false;
  error: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  toggleMode(): void {
    this.isLoginmode = !this.isLoginmode;
  }
  handleAuth(form: NgForm) {
    if (!form.valid) {
      return;
    }
    this.loading = true;
    const email = form.value.email;
    const password = form.value.password;
    let authResponse: Observable<AuthResponse>;
    if (this.isLoginmode) {
      authResponse = this.authService.login(email, password);
    } else {
      authResponse = this.authService.register(email, password);
    }

    authResponse.subscribe({
      next: () => {
        this.loading = false;
        this.error = '';
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.loading = false;
        this.error = err;
      },
    });
  }
}
