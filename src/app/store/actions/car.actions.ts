import { createAction, props } from '@ngrx/store';
//models
import { Car } from '@models/car.model';

//Car
export const loadCar = createAction(
  '[Car] Load Car',
  props<{ carId: string }>()
);

export const loadCarSuccess = createAction(
  '[Car] Loaded Car Success',
  props<{ car: Car }>()
);

export const loadCarFailed = createAction('[Car] Loaded Car Failed');
