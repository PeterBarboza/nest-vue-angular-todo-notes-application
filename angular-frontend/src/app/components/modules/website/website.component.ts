import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-website',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './website.component.html',
})
export class WebsiteComponent {

}
