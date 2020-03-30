import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {CookieService} from 'ngx-cookie-service';
import {AuthService} from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 1;
  public username = 'must login';
  private loginstatus = false;
  public subs: string[] = [];

  public appPages = [
    {
      title: 'Coinbase:BTCUSD',
      url: '/folder/Coinbase:BTCUSD',
      icon: 'logo-bitcoin'
    },
    {
      title: 'Coinbase:LTCUSD',
      url: '/folder/Coinbase:LTCUSD',
      icon: 'paper-plane'
    },
    {
      title: 'Coinbase:ETHUSD',
      url: '/folder/Coinbase:ETHUSD',
      icon: 'heart'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public cookieService: CookieService,
    private authService: AuthService,

) {
    this.subs = new Array<string>();
    this.initializeApp();
    this.getSubsByEmail();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.getSubsByEmail();
    });
  }

  ngOnInit() {
    this.getLoggedInStatus();
    const path = window.location.pathname.split('folder/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
  }

  logout(): void {
    this.cookieService.deleteAll('../');
    window.location.reload();
  }

  getLoggedInStatus(): boolean {
    if (!this.cookieService.check('username')) { return false; }
    if (this.cookieService.get('username') !== 'false') { this.loginstatus = true; this.username = this.cookieService.get('username'); }
    if (this.cookieService.get('username') === 'false') { this.loginstatus = false; }
    return this.loginstatus;
  }

  submit(title: string) {
    console.log(title);
    window.location.href = 'http://localhost:8100/folder/' + title;
  }

  login() {
    window.location.pathname = 'signin';
  }

  signup() {
    window.location.pathname = 'register';
  }

  private getSubsByEmail(): void {
    console.log(this.cookieService.get('emailAddress'));
    this.authService.getSubsByEmail(this.cookieService.get('emailAddress'))
        .subscribe(subs => {
          this.subs = subs; });
  }

  unsubscribe(sub: string) {
    this.authService.unsub(this.cookieService.get('emailAddress'), sub)
        .subscribe(res => console.log(res));
    window.location.reload();
  }
}
