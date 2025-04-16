import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { NgIf } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import { RouterLink } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'login-component',
  templateUrl: 'login.component.html',
  styleUrl: './login.component.scss',
  imports: [ReactiveFormsModule, NgIf, RouterLink],
  standalone: true,
})
export class LoginComponent implements OnInit, OnDestroy {
  isLoading = false;
  private unsubscribe$ = new Subject<void>();
  userData: any = null;

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(
    private authService: AuthService,
    private cookieService: CookieService
  ) {}

  logout() {
    this.authService.removeToken();
  }

  onSubmit() {
    if (this.loginForm.invalid) return;

    this.isLoading = true;
    const { username, password } = this.loginForm.value;

    this.authService
      .login(username!, password!)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (response) => {
          this.userData = response;
          this.cookieService.set('accessToken', response.accessToken, 1);
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Login failed:', error);
          this.isLoading = false;
        },
      });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  ngOnInit() {}
}
