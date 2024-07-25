import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-header',
  standalone: true,
  styleUrl: './header.component.css',
  templateUrl: './header.component.html',
  imports: [MatToolbarModule, RouterLink, RouterLinkActive, MatButtonModule],
})
export class HeaderComponent {}
