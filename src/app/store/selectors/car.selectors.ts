import { createFeatureSelector, createSelector } from '@ngrx/store';
//models
import { CarState } from '@store/store.model';

const getCarState = createFeatureSelector<CarState>('car');

export const selectCar = createSelector(getCarState, (state) => {
  return Object.values(state.entities)[0];
});

export const selectCarLoaded = createSelector(
  getCarState,
  (state) => state.loaded
);

export const selectCarLoading = createSelector(
  getCarState,
  (state) => state.loading
);
