import * as Promise from 'bluebird';

import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { httpWrapperService } from './httpWrapper.service';

import { Constants } from './Constants';

@Injectable()
export class ReviewService {

  constructor (private _httpWrapperService: httpWrapperService) {}

  createReview(review : { text: string, rating: number, id: string, review_type: string }): Promise<any> {
    return new Promise((resolve, reject) => {

      const payload = {
        text: review.text,
        stars: review.rating
      };

      this._httpWrapperService.post(`${Constants.REVIEW}/${review.review_type}/${review.id}`, payload)
        .then(response => resolve(response))
        .catch(error => reject(error));

    });
  }

  getReview(review_type: string, id: number): Promise<any> {
    return new Promise((resolve, reject) => {
      //Add pagination handling.
      this._httpWrapperService.get(`${Constants.REVIEW}/${review_type}/${id}`)
        .then(response => response.reviews)
        .catch(error => console.error(error));
    });
  }
}
