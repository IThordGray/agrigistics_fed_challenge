import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, shareReplay, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  @HostBinding('class.isHandset')
  isHandset = false;
  private readonly _onDestroy$ = new Subject();

  constructor(
    private breakpointObserver: BreakpointObserver
  ) {
  }

  ngOnInit() {
    this.breakpointObserver
      .observe(Breakpoints.Handset)
      .pipe(
        map(result => result.matches),
        shareReplay(),
        takeUntil(this._onDestroy$)
      ).subscribe(x => this.isHandset = x);
  }

  ngOnDestroy() {
    this._onDestroy$.next();
    this._onDestroy$.complete();
  }

  showSubActions() {
    console.log('More has been clicked.')
  }

  showNotifications() {
    console.log('Notifications has been clicked.')
  }

  expandMenu() {
    console.log('Menu has been clicked.')
  }

  downloadApp() {
    console.log('Download button as been clicked.')
  }

  showHelp() {
    console.log('How help clicked.')
  }

  showProfile() {
    console.log('Show profile clicked.')
  }
}
