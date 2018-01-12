import { Component, OnInit } from '@angular/core';

import { ParamsService } from '../shared/params.service';
import { TripsService } from '../shared/Trips.service';
import { UserService } from '../shared/User.service';
import { ModalWindowService } from '../shared/modalWindow.service';
import { ReviewService } from '../shared/Review.service';

@Component({
  selector: `trip`,
  templateUrl: `./Trip.template.html`,
  styleUrls: ['./trip.scss']
})
export class TripComponent {

  paramsSub: any;
  params: any;

  userSub: any;
  user: any;

  id: any;
  trip: any;

  tab: any = 'Details';

  reviews: any = [];

  constructor(private _ParamsService: ParamsService,
              private _TripsService: TripsService,
              private _UserService: UserService,
              private _ModalWindowService: ModalWindowService,
              private _ReviewService: ReviewService){
    this.paramsSub = this._ParamsService.paramsObs.subscribe(params => {
      if (params && params.currentModule === 'trip') {
          this.params = params;
          this.id = this.params.path.split('/').pop();

          this._TripsService.getTrip(this.id)
            .then(trip => this.trip = trip)
            .catch(error => console.error(error));
      }
    });
    this.userSub = this._UserService.currentUser.subscribe(user => {
      if (user) {
        this.user = user;
      }
    });
  }

  bookTrip(): void {
    this._ModalWindowService.openModal('book-trip', null, null, this.trip.id)
  }

  changeTab($event): void {
    this.tab = $event;

    if ($event === 'Reviews')
      this._ReviewService.getReview('trip', this.id)
        .then(reviews => this.reviews = reviews.reviews)
        .catch(error => console.error(error));
  }

  createReview(): void {
    this._ModalWindowService.openModal('review', null, null, this.id);
  }

  ngOnDestroy() {
    if (this.paramsSub)
        this.paramsSub.unsubscribe();

    if (this.userSub)
        this.userSub.unsubscribe();
  }
}
