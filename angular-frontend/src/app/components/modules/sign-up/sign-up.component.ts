import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router'

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './sign-up.component.html',
})
export class SignUpComponent {

}
