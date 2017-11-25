import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { TripsService } from '../shared/Trips.service';
import { LocalsService } from '../shared/Locals.service';


@Component({
  selector: 'home',
  templateUrl: './Home.template.html',
  styleUrls: ['./home.scss']
})

export class HomeComponent implements OnInit {

  trips: any = [];
  locals: any = [];
  size: string = 's';

  constructor (private _TripsService: TripsService,
               private _LocalsService: LocalsService,
               private _Router: Router){

  }

  ngOnInit() {
    this._LocalsService.getLocals(null, 'rating')
      .then(response => {
        this.locals = response.locals.slice(0, 5);
      }).catch(error => console.error(error));

    this._TripsService.getTrips('popularity')
      .then(response => {
        this.trips = response.trips.slice(0, 5);
      }).catch(error => console.error(error));
  }

  goToProfilePage(id: string): void {
    this._Router.navigateByUrl(`user/${id}`);
  }

  goToTripPage(id: string): void {
    this._Router.navigateByUrl(`trip/${id}`);
  }
}
