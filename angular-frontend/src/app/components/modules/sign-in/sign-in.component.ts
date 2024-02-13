import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router'

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './sign-in.component.html',
})
export class SignInComponent {

}
