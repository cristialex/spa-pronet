import { Routes } from '@angular/router';
import { PAGE_TOKEN } from '@root/api-urls';
import { PageUrlEnum, ParentUrlEnum } from './models/page-url.model';
import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { CarFeatureKey, carReducer } from './store/reducer/car.reducer';
import { CarEffects } from './store/effects/car.effects';
import { carDetailsGuard } from './guards/car-details.guard';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: ParentUrlEnum.Home,
  },
  {
    path: ParentUrlEnum.Home,
    loadComponent: () =>
      import('./home-page/home-page.component').then(
        (m) => m.HomePageComponent
      ),
  },
  {
    path: ParentUrlEnum.Dashboard,
    loadComponent: () =>
      import('./navigation/navigation.component').then(
        (m) => m.NavigationComponent
      ),
    canActivate: [authGuard],
    children: [
      {
        path: '',
        redirectTo: PageUrlEnum.Cars,
        pathMatch: 'full',
      },
      {
        path: PageUrlEnum.Cars,
        loadComponent: () =>
          import('./cars/all-cars/all-cars.component').then(
            (m) => m.AllCarsComponent
          ),
        providers: [{ provide: PAGE_TOKEN, useValue: PageUrlEnum.Cars }],
      },
      {
        path: PageUrlEnum.FavoriteCars,
        loadComponent: () =>
          import('./cars/all-cars/all-cars.component').then(
            (m) => m.AllCarsComponent
          ),
        providers: [
          { provide: PAGE_TOKEN, useValue: PageUrlEnum.FavoriteCars },
        ],
      },
      {
        path: `${PageUrlEnum.Cars}/:id`,
        loadComponent: () =>
          import('./cars/car-details/car-details.component').then(
            (m) => m.CarDetailsComponent
          ),
        canActivate: [carDetailsGuard],
        providers: [
          provideState(CarFeatureKey, carReducer),
          provideEffects(CarEffects),
        ],
      },
      {
        path: `${PageUrlEnum.FavoriteCars}/:id`,
        loadComponent: () =>
          import('./cars/car-details/car-details.component').then(
            (m) => m.CarDetailsComponent
          ),
        canActivate: [carDetailsGuard],
        providers: [
          provideState(CarFeatureKey, carReducer),
          provideEffects(CarEffects),
        ],
      },
    ],
  },
];
