import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponentComponent } from './page-not-found-component/page-not-found-component.component';
import { MonitorComponent } from './monitor/monitor.component';


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
