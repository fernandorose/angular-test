import { Component, OnInit } from '@angular/core';
import { DogService } from '../../services/dog.service';
import { NgIf } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'dog-page',
  templateUrl: 'dog.component.html',
  imports: [NgIf],
})
export class DogPageComponent implements OnInit {
  isLoading = false;
  private unsubscribe$ = new Subject<void>();
  dog: any = null;

  constructor(private dogService: DogService) {}

  ngOnInit() {
    this.isLoading = true;
    this.dogService
      .getRandom()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (data) => {
          this.dog = data;
          this.isLoading = false;
        },
        error: (err) => console.error(err),
      });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
