import { Component, Input, OnInit } from '@angular/core';
import { BlockStatus } from '../../shared/models/block.interface';

@Component({
  selector: 'app-status-icon',
  templateUrl: './status-icon.component.html',
  styleUrls: ['./status-icon.component.scss']
})
export class StatusIconComponent implements OnInit {

  @Input() status!: BlockStatus;

  constructor() { }

  ngOnInit(): void {
  }

}
