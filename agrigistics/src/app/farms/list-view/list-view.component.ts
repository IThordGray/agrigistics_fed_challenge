import { Component, OnDestroy, OnInit } from '@angular/core';
import { IBlock } from '../../shared/models/block.interface';
import { FarmsService } from '../farms.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.scss']
})
export class ListViewComponent implements OnInit, OnDestroy {

  readonly _onDestroy$ = new Subject();
  readonly visibleFarmBlocks$ = this._farmsService.visibleFarmBlocks$;

  selectedBlock!: IBlock;

  constructor(
    private _farmsService: FarmsService
  ) { }

  ngOnInit(): void {
    this.visibleFarmBlocks$.pipe(
      takeUntil(this._onDestroy$)
    ).subscribe(farmBlocks => this.selectedBlock = farmBlocks[0])
  }

  ngOnDestroy() {
    this._onDestroy$.next();
    this._onDestroy$.complete();
  }

  doChange($event: Event) {
    console.log($event)
  }
}
