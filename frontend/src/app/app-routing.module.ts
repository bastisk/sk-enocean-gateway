import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { MonitorComponent } from './pages/monitor/monitor.component';
import { PageNotFoundComponentComponent } from './pages/page-not-found-component/page-not-found-component.component'

const routes: Routes = [
  { path: 'devices', component: HomeComponent},
  { path: 'monitor', component: MonitorComponent},
  {
    path: '',
    redirectTo: '/devices',
    pathMatch: 'full'
  },
  { path: '**', component: PageNotFoundComponentComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
