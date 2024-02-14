import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  constructor(public authService: AuthService) {}
  isDialogOpen = false
}
