import { ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { concatMap, filter, of, switchMap } from 'rxjs';
//store
import { Store } from '@ngrx/store';
import * as CarActions from '@store/actions/car.actions';
import * as CarSelector from '@store/selectors/car.selectors';
//models
import { AppState } from '@store/store.model';
//services
import { StoreService } from '@store/store.services';

export const carDetailsGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot
) => {
  const router: Router = inject(Router);
  const storeService: StoreService = inject(StoreService);
  const appState: Store<AppState> = inject(Store<AppState>);

  return appState.select(CarSelector.selectCar).pipe(
    concatMap(() => storeService.getCarById(route.params['id'])),
    filter((car) => !!car),
    switchMap((res) => {
      if (res.id) {
        appState.dispatch(CarActions.loadCarSuccess({ car: res }));
        return of(true);
      }
      router.navigate(['/cars']);
      return of(false);
    })
  );
};
