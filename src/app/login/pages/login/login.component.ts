import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { NgIf } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Subject, Subscription, takeUntil } from 'rxjs';

@Component({
  selector: 'login-page',
  templateUrl: 'login.component.html',
  styleUrl: './login.component.scss',
  imports: [ReactiveFormsModule, RouterOutlet],
})
export class LoginPageComponent {}
