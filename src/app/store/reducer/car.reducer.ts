import { createReducer, on } from '@ngrx/store';
import * as CarActions from '@store/actions/car.actions';
//models
import { initialStateCar, carAdapter } from '@store/store.model';

export const CarFeatureKey = 'car';

export const carReducer = createReducer(
  initialStateCar,

  on(CarActions.loadCar, (state) => {
    return {
      ...state,
      loading: true,
      loaded: false,
    };
  }),

  on(CarActions.loadCarSuccess, (state, { car }) => {
    return carAdapter.setOne(car, {
      ...state,
      loading: false,
      loaded: true,
    });
  }),

  on(CarActions.loadCarFailed, () => {
    return {
      ...initialStateCar,
      loading: false,
      loaded: false,
    };
  })
);
