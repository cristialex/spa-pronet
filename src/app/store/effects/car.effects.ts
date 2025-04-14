import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
//actions
import * as CarActions from '@store/actions/car.actions';
//services
import { StoreService } from '@store/store.services';

@Injectable()
export class CarEffects {
  private storeService = inject(StoreService);

  constructor(private actions$: Actions) {}

  loadData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CarActions.loadCar),
      mergeMap((action) =>
        this.storeService.getCarById(action.carId).pipe(
          map((res) => {
            if (res) {
              return CarActions.loadCarSuccess({
                car: res,
              });
            }
            return CarActions.loadCarFailed();
          }),
          catchError(() => of(CarActions.loadCarFailed()))
        )
      )
    )
  );
}
