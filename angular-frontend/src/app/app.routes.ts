import { Routes } from '@angular/router';

import { SignInComponent } from './sign-in/sign-in.component'
import { SignUpComponent } from './sign-up/sign-up.component'
import { AppComponent } from './app.component';
import { WebsiteComponent } from './website/website.component';

export const routes: Routes = [
  { path: 'sign-in', component: SignInComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: '', component: WebsiteComponent },
];
