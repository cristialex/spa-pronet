import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
//models
import { Car } from '@models/car.model';
import { API_URL } from '@root/api-urls';
import { PageUrlEnum } from '@models/page-url.model';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  constructor(private http: HttpClient) {}

  getCarById(id: string): Observable<Car> {
    return this.http.get<Car>(`${API_URL}/${PageUrlEnum.Cars}/${id}`);
  }
}
