import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  selector: 'navbar-component',
  templateUrl: 'navbar.component.html',
  styleUrl: 'navbar.component.scss',
})
export class NavbarComponent {
  navLinks = [
    { path: '/', label: 'Home' },
    { path: '/auth/login', label: 'Login' },
    { path: '/dog', label: 'Dogs' },
  ];
}
