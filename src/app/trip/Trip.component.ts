import { Component, OnInit } from '@angular/core';

import { ParamsService } from '../shared/params.service';
import { TripsService } from '../shared/Trips.service';

@Component({
  selector: `trip`,
  templateUrl: `./Trip.template.html`
})
export class TripComponent implements OnInit {

  paramsSub: any;
  params: any;
  id: any;
  trip: any;

  constructor(private _ParamsService: ParamsService,
              private _TripsService: TripsService){
    this.paramsSub = this._ParamsService.paramsObs.subscribe(params => {
      if (params) {
          this.params = params;
          this.id = this.params.split('/').pop();

          this._TripsService.getTrip(this.id)
            .then(trip => this.trip = trip)
            .catch(error => console.error(error));
      }
    });
  }

  ngOnInit() {

  }

  ngOnDestroy() {
    if (this.paramsSub)
        this.paramsSub.unsubscribe();
  }
}
