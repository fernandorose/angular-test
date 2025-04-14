import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { NgIf } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Subject, Subscription, takeUntil } from 'rxjs';

@Component({
  selector: 'login-component',
  templateUrl: 'login.component.html',
  styleUrl: './login.component.scss',
  imports: [ReactiveFormsModule, NgIf, RouterLink],
  standalone: true,
})
export class LoginComponent implements OnInit {
  isLoading = false;
  private unsubscribe$ = new Subject<void>();
  // private subscription: Subscription;
  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  userData: any = null;

  constructor(
    private authService: AuthService,
    private cookieService: CookieService
  ) {}

  onSubmit() {
    this.isLoading = true;
    if (this.loginForm.invalid) return;

    const { username, password } = this.loginForm.value;

    this.authService
      .login(username!, password!)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (response) => {
          console.log('Login success:', response);
          this.userData = response;
          this.cookieService.set('accessToken', response.accessToken, 1);
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Login failed:', error);
        },
      });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  ngOnInit() {}
}
