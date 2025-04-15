import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  Inject,
  inject,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import {
  combineLatest,
  concatMap,
  debounceTime,
  distinctUntilChanged,
  of,
  switchMap,
  tap,
} from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  CdkVirtualScrollViewport,
  ScrollingModule,
} from '@angular/cdk/scrolling';
import { NgClass } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
//angular material
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
//services
import { AllCarsService } from './all-cars.service';
//models
import { Car } from '@models/car.model';
import { ApiResponse } from '@models/api-response.model';
import { PAGE_TOKEN } from '@root/api-urls';
import { PageUrlEnum, ParentUrlEnum } from '@models/page-url.model';

@Component({
  selector: 'all-cars',
  templateUrl: './all-cars.component.html',
  styleUrl: './all-cars.component.scss',
  imports: [
    ScrollingModule,
    MatIconModule,
    NgClass,
    MatTooltipModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatButtonModule,
  ],
  providers: [AllCarsService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AllCarsComponent implements OnInit, AfterViewInit {
  @ViewChild(CdkVirtualScrollViewport) viewport!: CdkVirtualScrollViewport;

  loading = signal(true);
  cars = signal<Car[]>([]);

  searchControl = new FormControl();

  private destroyRef = inject(DestroyRef);
  private searchParams = {
    _page: 1,
    _per_page: 10,
    model: '',
  };
  private totalSize = 0;
  private isFavoritePage = false;
  private _snackBar = inject(MatSnackBar);

  constructor(
    private allCarsService: AllCarsService,
    private router: Router,
    @Inject(PAGE_TOKEN) private pageToken: string
  ) {}

  ngOnInit() {
    this.isFavoritePage = this.pageToken === PageUrlEnum.FavoriteCars;
    this.getAllCars();
    this.search();
  }

  ngAfterViewInit() {
    this.scrollDetection();
  }

  markAsFavorite(element: Car) {
    element = {
      ...element,
      isFavorite: !element.isFavorite,
    };
    const findIndex = this.cars().findIndex(
      (car: Car) => car.id === element.id
    );

    this.cars.update((cars) => {
      cars[findIndex].isFavorite = element.isFavorite;
      return cars;
    });

    if (this.isFavoritePage) {
      const cars = this.cars().filter((car: Car) => car.isFavorite);
      this.cars.set(cars);
    }

    this.allCarsService
      .updateCars(element)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        concatMap((res: Car) => {
          if (res.id) {
            return res.isFavorite
              ? combineLatest({
                  response: this.allCarsService.addToFavorites(element),
                  added: of(true),
                })
              : combineLatest({
                  response: this.allCarsService.removeFromFavorites(res.id),
                  added: of(false),
                });
          }

          return of({
            response: null,
            added: false,
          });
        }),
        tap((res) => {
          if (!res.response) {
            this.notification('Something went wrong, please retry');
            return;
          }

          this.notification(
            res.added ? 'Added to favorite' : 'Removed from favorite'
          );
        })
      )
      .subscribe();
  }

  seeDetails(car: Car) {
    this.router.navigate([
      `./${ParentUrlEnum.Dashboard}/${
        this.isFavoritePage ? PageUrlEnum.FavoriteCars : PageUrlEnum.Cars
      }/${car.id}`,
    ]);
  }

  private notification(msg: string) {
    this._snackBar.open(msg, 'X', {
      horizontalPosition: 'right',
      verticalPosition: 'top',
      duration: 2000,
    });
  }

  private getAllCars() {
    this.allCarsService
      .getCars(this.searchParams, this.pageToken)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        tap((res: ApiResponse<Car[]>) => this.searchResults(res))
      )
      .subscribe();
  }

  private scrollDetection() {
    this.viewport
      .elementScrolled()
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        tap(() => {
          const endOffset = this.viewport.measureScrollOffset('bottom');
          if (
            endOffset === 0 &&
            this.cars().length < this.totalSize &&
            !this.loading()
          ) {
            this.searchParams._page += 1;
            this.loading.set(true);
            this.getAllCars();
          }
        })
      )
      .subscribe();
  }

  private search() {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        switchMap((value: string) => {
          this.loading.set(true);
          this.searchParams = {
            ...this.searchParams,
            model: value
              ? value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()
              : '',
          };
          return this.allCarsService.getCars(this.searchParams, this.pageToken);
        }),
        tap((res) => {
          this.searchParams._page = 1;
          if (res.data.length > 0) {
            this.cars.set([]);
            this.searchResults(res);
            return;
          }
          this.noSearchResults();
        })
      )
      .subscribe();
  }

  private searchResults(res: ApiResponse<Car[]>) {
    if (this.isFavoritePage) {
      res.data = res.data.filter((car: Car) => car.isFavorite);
    }
    this.cars.set([...this.cars(), ...(res.data || [])]);
    this.totalSize = res.items;
    this.loading.set(false);
  }

  private noSearchResults() {
    this.totalSize = 0;
    this.cars.set([]);
    this.loading.set(false);
    this.searchParams._page = 1;
  }
}
