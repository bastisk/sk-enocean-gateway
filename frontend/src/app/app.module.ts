import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { MonitorComponent } from './pages/monitor/monitor.component';
import { PageNotFoundComponentComponent } from './pages/page-not-found-component/page-not-found-component.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MonitorComponent,
    PageNotFoundComponentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
