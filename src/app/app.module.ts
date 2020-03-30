import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import {HttpClient, HttpClientModule} from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FolderPageModule } from './folder/folder.module';
import {CookieService} from 'ngx-cookie-service';
import {AuthService} from './auth/auth.service';
import {RegisterPageModule} from './auth/register/register.module';
import { FormsModule } from '@angular/forms';
import {LoginPageModule} from './auth/login/login.module';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
    imports: [
        BrowserModule,
        IonicModule.forRoot(),
        AppRoutingModule,
        FolderPageModule,
        HttpClientModule,
        RegisterPageModule,
        LoginPageModule,
        FormsModule
    ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
      CookieService,
      AuthService,
      HttpClient
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
