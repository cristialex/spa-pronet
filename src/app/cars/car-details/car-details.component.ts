import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { tap } from 'rxjs';
import { DecimalPipe, NgClass } from '@angular/common';
//angular material
import { MatIconModule } from '@angular/material/icon';
//store
import { Store } from '@ngrx/store';
import * as CarSelector from '@store/selectors/car.selectors';
//models
import { Car } from '@models/car.model';

@Component({
  templateUrl: './car-details.component.html',
  styleUrl: './car-details.component.scss',
  imports: [DecimalPipe, NgClass, MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CarDetailsComponent {
  loading = signal(true);
  car = signal<Car | null>(null);

  constructor(private carStore: Store) {}

  ngOnInit() {
    this.carStore
      .select(CarSelector.selectCar)
      .pipe(
        tap((res) => {
          if (res?.id) {
            this.car.set(res);
          }
          this.loading.set(false);
        })
      )
      .subscribe();
  }
}
