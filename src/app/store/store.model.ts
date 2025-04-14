import { createEntityAdapter, EntityState } from '@ngrx/entity';
//models
import { Car } from '@models/car.model';

export interface CarState extends EntityState<Car> {
  loading: boolean;
  error: string | null;
  loaded: boolean;
}

export const carAdapter = createEntityAdapter<Car>();

export const initialStateCar = carAdapter.getInitialState({
  loading: false,
  loaded: false,
  error: null,
});

export interface AppState {
  car: Car;
}
