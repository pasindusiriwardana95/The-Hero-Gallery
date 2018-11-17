import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';

import {HeroesComponent} from './heroes/heroes.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {HeroDetailComponent} from './hero-detail/hero-detail.component';




const routes : Routes= [
  {path:'heroes', component: HeroesComponent},
  {path:'dashboard', component:DashboardComponent},
  // below route redirects a url that fully matches the empty path to the route whose path is '/dashboard'
  {path:'',redirectTo:'/dashboard', pathMatch:'full'},
  {path:'detail/:id', component:HeroDetailComponent}
];

@NgModule({
  exports:[RouterModule],
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
    // above is the configuration with routes above at the root level
  ]
})
export class AppRoutingModule { }
