import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute } from '@angular/router';
import { Subject, Subscription, takeUntil } from 'rxjs';

@Component({
  selector: 'user-page',
  templateUrl: 'user.component.html',
  imports: [NgIf],
})
export class UserPageComponent implements OnInit {
  isLoading = false;
  userId: number | null = null;
  user: any = null;
  private unsubscribe$ = new Subject<void>();

  constructor(
    private authService: AuthService,
    private cookieService: CookieService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.isLoading = true;
    const id = this.route.snapshot.paramMap.get('id');
    this.userId = id ? Number(id) : null;
    const token = this.cookieService.get('accessToken');
    if (token) {
      this.authService
        .getUser(token)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe({
          next: (data) => {
            this.user = data;
            this.isLoading = false;
          },
          error: (err) => console.error(err),
        });
    }
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
