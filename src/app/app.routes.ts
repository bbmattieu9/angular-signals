import {Routes} from '@angular/router';
import {HomeComponent} from "@app/home/home.component";
import {LoginComponent} from "@app/login/login.component";
import {LessonsComponent} from "@app/lessons/lessons.component";
import {ResourceDemoComponent} from "@app/resource-demo/resource-demo.component";
import {LinkedSignalDemoComponent} from "@app/linked-signal/linked-signal-demo.component";
import {isUserAuthenticated} from "@app/guards/auth.guard";

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [isUserAuthenticated]
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "lessons",
    component: LessonsComponent
  },
  {
    path:"shopping-cart",
    component: LinkedSignalDemoComponent
  },
  {
    path: "resource-demo",
    component: ResourceDemoComponent
  },
  {
    path: '**',
    redirectTo: '/'
  }
];
