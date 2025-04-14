import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
//models
import { ApiResponse } from '@models/api-response.model';
import { Car } from '@models/car.model';
import { API_URL } from '@root/api-urls';
import { PageUrlEnum } from '@models/page-url.model';

@Injectable()
export class AllCarsService {
  constructor(private http: HttpClient) {}

  getCars(
    params: {
      _page: number;
      _per_page: number;
      model: string;
    },
    page: string
  ): Observable<ApiResponse<Car[]>> {
    return this.http.get<ApiResponse<Car[]>>(`${API_URL}/${page}`, {
      params,
    });
  }

  updateCars(params: Car): Observable<Car> {
    return this.http.patch<Car>(
      `${API_URL}/${PageUrlEnum.Cars}/${params.id}`,
      params
    );
  }

  addToFavorites(params: Car): Observable<Car> {
    return this.http.post<Car>(
      `${API_URL}/${PageUrlEnum.FavoriteCars}`,
      params
    );
  }

  removeFromFavorites(id: string): Observable<Car> {
    return this.http.delete<Car>(
      `${API_URL}/${PageUrlEnum.FavoriteCars}/${id}`
    );
  }
}
