import {Component, OnInit, Input, AfterViewInit} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {Signup} from '../auth/signup';
import {CookieService} from 'ngx-cookie-service';
import {AppComponent} from '../app.component';

declare const TradingView: any;

@Component({
  selector: 'app-tradingview',
  templateUrl: './tradingview.component.html',
  styleUrls: ['./tradingview.component.scss']
})

export class TradingviewComponent implements OnInit, AfterViewInit {
    private authService: AuthService;
    public cookieService: CookieService;
    private appComponent: AppComponent;
    @Input() public pair: string;
    private subbed = false;

  constructor(authService: AuthService, appComponent: AppComponent, cookieService: CookieService) {
      this.authService = authService;
      this.appComponent = appComponent;
      this.cookieService = cookieService;
  }

  ngOnInit() {
      this.checkForSub();
    // tslint:disable-next-line:no-unused-expression
      new TradingView.widget(
        {
            autosize: true,
            symbol: this.pair || 'COINBASE:BTCUSD',
            interval: '60',
            timezone: 'exchange',
            theme: 'dark',
            style: '1',
            locale: 'en',
            toolbar_bg: '#f1f3f6',
            enable_publishing: false,
            allow_symbol_change: true,
            container_id: 'tradingview_110d9'
        }
    );
  }

    ngAfterViewInit(): void {
      this.ngOnInit();
  }
    private checkForSub(): void {
      console.log('checking ' + ' ' + this.cookieService.get('emailAddress') + ' ' + this.pair);
      this.authService.checkEmailForPair(this.cookieService.get('emailAddress'), this.pair)
          .subscribe(res => this.subbed = res);
    }
    onSubmit(pair: string) {
        window.location.reload();
        return this.authService.signUpAlerts(new Signup(this.cookieService.get('emailAddress'), pair)).subscribe();
    }

    unsubscribe(sub: string) {
        this.authService.unsub(this.cookieService.get('emailAddress'), sub)
            .subscribe(res => console.log(res));
        window.location.reload();
    }
}

