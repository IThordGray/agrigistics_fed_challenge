import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { map, shareReplay, takeUntil } from 'rxjs/operators';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { FarmsService } from './farms.service';

@Component({
  selector: 'app-farms',
  templateUrl: './farms.component.html',
  styleUrls: ['./farms.component.scss']
})
export class FarmsComponent implements OnInit, OnDestroy {


  readonly _onDestroy$ = new Subject();
  readonly searchableFarms$ = this._farmsService.searchableFarms$;


  @HostBinding('class.isHandset')
  isHandset = false;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private _farmsService: FarmsService
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
}
