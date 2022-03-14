import { Component, OnInit } from '@angular/core';
import { FarmsService } from '../farms.service';

@Component({
  selector: 'app-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.scss']
})
export class TableViewComponent implements OnInit {

  readonly displayedColumns: string[] = [
    'status',
    'name',
    'farmName',
    'variant',
    'size',
    'createdAt',
    'deletedAt'
  ];

  farms$ = this._farmsService.visibleFarmBlocks$;

  constructor(
    private _farmsService: FarmsService
  ) { }

  ngOnInit(): void {
  }

}
