import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { DUMMY_DATA } from './dummy.data';
import { map, shareReplay, switchMap } from 'rxjs/operators';
import { IBlock } from '../shared/models/block.interface';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Injectable({
  providedIn: 'root'
})
export class FarmsService {

  readonly isHandset$ = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    )

  readonly selectedFarms$ = new BehaviorSubject('');
  readonly showRemovedOnly$ = new BehaviorSubject(false);
  readonly searchText$ = new BehaviorSubject('');

  readonly farms$ = of(DUMMY_DATA).pipe(
    map(blocks => blocks.map(x => {
      const block = { ...x, createdAt: new Date(x.createdAt) } as IBlock;
      if (x.deletedAt) block.deletedAt = new Date(x.deletedAt);
      return block;
    }))
  );

  readonly visibleFarmBlocks$ = this.farms$.pipe(
    switchMap(farms => this.selectedFarms$.pipe(
      map((selectedFarm) => {
        if (!selectedFarm) return farms;
        return farms.filter(x => x.farmName === selectedFarm);
      }),

      switchMap(farms => this.showRemovedOnly$.pipe(
        map(showRemovedOnly => {
          if (!showRemovedOnly) return farms;
          return farms.filter(x => x.deletedAt)
        }),

        switchMap(farms => this.searchText$.pipe(
          map(searchText => {
            if (!searchText) return farms;
            return farms.filter(x => {
              const lowerSearch = searchText.toLowerCase();
              return x.name.toLowerCase().includes(lowerSearch) || x.variant?.toLowerCase().includes(lowerSearch)
            })
          })
        ))
      ))
    ))
  )

  readonly searchableFarms$ = this.farms$.pipe(
    map(blocks => blocks.reduce((p: string[], v: IBlock) => {
      if (!p.includes(v.farmName)) p.push(v.farmName);
      return p;
    }, []))
  )

  constructor(
    private breakpointObserver: BreakpointObserver
  ) {
  }

  filterFarm(farm: string) {
    this.selectedFarms$.next(farm);
  }

  filterRemoved(value: boolean) {
    this.showRemovedOnly$.next(value);
  }

  search(value: string) {
    this.searchText$.next(value);
  }
}
