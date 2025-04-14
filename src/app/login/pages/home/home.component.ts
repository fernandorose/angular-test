import { Component, effect, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'home-page',
  templateUrl: 'home.component.html',
  imports: [RouterLink],
})
export class HomePageComponent {
  counter = signal(0);

  increment() {
    this.counter.update((value) => value + 1);
  }
  decrement() {
    this.counter.update((value) => value - 1);
  }
}
