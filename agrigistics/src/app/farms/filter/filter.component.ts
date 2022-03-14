import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FarmsService } from '../farms.service';
import { MatInput } from '@angular/material/input';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit, AfterViewInit, OnDestroy {

  readonly _onDestroy$ = new Subject();
  readonly searchableFarms$ = this._farmsService.searchableFarms$;
  readonly showRemovedOnly$ = this._farmsService.showRemovedOnly$;
  readonly searchText$ = this._farmsService.searchText$;

  searchText!: string;

  selectedFarm = '';

  @ViewChild('search', { read: MatInput }) private _searchInput!: MatInput;

  constructor(
    private _farmsService: FarmsService
  ) {
  }

  ngAfterViewInit() {
    this._searchInput.ngControl.valueChanges?.pipe(
      debounceTime(2000),
      takeUntil((this._onDestroy$))
    ).subscribe(x => this._farmsService.search(x));
  }

  filter(farm: string) {
    this._farmsService.filterFarm(farm);
  }

  filterRemoved(value: boolean) {
    this._farmsService.filterRemoved(value);
  }

  ngOnInit() {
    this._farmsService.searchText$.pipe(
      takeUntil(this._onDestroy$)
    ).subscribe(x => this.searchText = x);
  }

  ngOnDestroy() {
    this._onDestroy$.next();
    this._onDestroy$.complete();
  }

  clearSearch() {
    this._farmsService.search('')  }
}
