import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Country } from '../common/country';
import { State } from '../common/state';

@Injectable({
  providedIn: 'root'
})
export class ShopFormServiceService {
  private baseUrl = 'http://localhost:8080/api';

  constructor() { }


  getCreditCardsYears(): Observable<number[]> {
    let data: number[] = [];

    const startYear: number = new Date().getFullYear();
    const endYear: number = startYear + 10;

    for (let year = startYear; year <= endYear; year++) {
      data.push(year);
    }
    return of(data);
  }

  getCreditCardsMonth(startMonth: number): Observable<number[]> {
    let data: number[] = [];

    for (let month = startMonth; month <= 12; month++) {
      data.push(month);
    }
    return of(data);
  }

  async getCountries(): Promise<Country[]> {
    try {
      const url = `${this.baseUrl}/countries`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: GetCountriesResponse = await response.json();
      return data._embedded.countries;
    } catch (error) {
      console.error('Error fetching product list:', error);
      throw error;
    }
  }

  async getStates(code: string): Promise<State[]> {
    try {
      const url = `${this.baseUrl}/states/search/findByCountryCode?code=${code}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: GetStatesResponse = await response.json();
      return data._embedded.states;
    } catch (error) {
      console.error('Error fetching product list:', error);
      throw error;
    }
  }

}

interface GetCountriesResponse {
  _embedded: {
    countries: Country[];
  }
}

interface GetStatesResponse {
  _embedded: {
    states: State[];
  }
}