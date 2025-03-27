import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoaderInterceptor } from './shared/interceptors/loader/loader.interceptor';
import { SharedModule } from './shared/shared.module';
import { WelcomeComponent } from './welcome/welcome.component';

@NgModule({
  declarations: [AppComponent, WelcomeComponent],
  imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule, HttpClientModule, SharedModule],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule {}
