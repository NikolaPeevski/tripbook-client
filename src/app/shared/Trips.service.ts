import * as Promise from 'bluebird';

import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { httpWrapperService } from './httpWrapper.service';

import { Area } from './models/Area.model';
import { Constants } from './Constants';

@Injectable()
export class TripsService {

  constructor (private _httpWrapperService: httpWrapperService) {}

  createTrip(trip: { title: string, description: string, numberOfPeople: string }): Promise<any> {
    return new Promise((resolve, reject) => {
      const payload = { trip };

      this._httpWrapperService.post(`${Constants.TRIPS}`, payload)
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  }

  getTrips(sorting?:string): Promise<any> {
    return new Promise((resolve, reject) => {
      this._httpWrapperService.get(`${Constants.TRIPS}${sorting ? '?sort=' + sorting + '&' : ''}`)
        .then(trips => resolve(trips))
    });
  }

  getTrip(id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this._httpWrapperService.get(`${Constants.TRIPS}/${id}`)
        .then(trip => resolve(trip))
        .catch(error => reject(error));
    });
  }

  getTripsByCity(cityId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this._httpWrapperService.get(`${Constants.TRIPS}?city_id=${cityId}`)
        .then(trips => resolve(trips))
        .catch(error => reject(error));
    });
  }

  bookALocal(from_date: string, to_date: string, numberOfPeople: string, title: string, description: string, local_id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const payload = {
        booking: {
          from_date,
          to_date,
          'number_of_people': numberOfPeople
        },
        trip: {
          title,
          description,
          local_id
        }
      }
      this._httpWrapperService.post(`${Constants.BOOKING}`, payload)
        .then(booking => resolve(booking))
        .catch(error => reject(error));
    });
  }

  requestATrip(from_date: string, to_date: string, numberOfPeople: string, title: string, description: string, city_id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const payload = {
        booking: {
          from_date,
          to_date,
          'number_of_people': numberOfPeople
        },
        trip: {
          title,
          description,
          city_id
        }
      }
      this._httpWrapperService.post(`${Constants.BOOKING}`, payload)
        .then(booking => resolve(booking))
        .catch(error => reject(error));
    });
  }

  bookATrip(from_date: string, to_date: string, numberOfPeople: string, trip_id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const payload = {
        booking: {
          trip_id,
          number_of_people: numberOfPeople,
          from_date,
          to_date
        }
      };

      this._httpWrapperService.post(`${Constants.BOOKING}`, payload)
        .then(booking => resolve(booking))
        .catch(error => reject(error));
    });
  }

  getTripRequests(id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      if (!id) return reject();

      this._httpWrapperService.get(`${Constants.TRIPS}/public?city_id=${id}`)
        .then(requests => resolve(requests.trips))
        .catch(error => reject(error));
    });
  }

  getPrivateBookings(): Promise<any> {
    return new Promise((resolve, reject) => {
      this._httpWrapperService.get(`${Constants.BOOKING}`)
        .then(bookings => resolve(bookings.bookings))
        .catch(error => reject(error));
    });
  }

  getPrivateTrips(): Promise<any> {
    return new Promise((resolve, reject) => {
      this._httpWrapperService.get(`${Constants.TRIPS}/private`)
        .then(privates => resolve(privates.trips))
        .catch(error => reject(error));
    });
  }

  handleBooking(id: string, action: string) : Promise<any> {
    return new Promise((resolve, reject) => {
      if (!id || !action) reject();

      this._httpWrapperService.post(`${Constants.BOOKING}/${id}/${Constants.BOOKING_ACTION[action]}`)
        .then(booking => resolve(booking))
        .catch(error => reject(error));
    });
  }



}
