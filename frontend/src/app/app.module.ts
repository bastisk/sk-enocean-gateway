import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponentComponent } from './page-not-found-component/page-not-found-component.component';
import { DeviceService } from 'src/services/api.service';
import { HttpClientModule } from '@angular/common/http';
import { MonitorComponent } from './monitor/monitor.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PageNotFoundComponentComponent,
    MonitorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [DeviceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
