import { Routes } from '@angular/router';

import { SignInComponent } from './components/modules/sign-in/sign-in.component'
import { SignUpComponent } from './components/modules/sign-up/sign-up.component'
import { WebsiteComponent } from './components/modules/website/website.component';

export const routes: Routes = [
  { path: 'sign-in', component: SignInComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: '', component: WebsiteComponent },
];
