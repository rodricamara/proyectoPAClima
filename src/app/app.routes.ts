import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './../app/components/home/home.component';
import {AboutComponent} from './../app/components/about/about.component';
import {APP_ROOT} from '@angular/core/src/di/scope';




const APP_ROUTES: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'about', component: AboutComponent},
  {path: '**', pathMatch: 'full', redirectTo: 'home'}
];

export const APP_ROUTING  = RouterModule.forRoot(APP_ROUTES);
