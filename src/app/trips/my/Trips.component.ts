import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ModalWindowService } from '../../shared/modalWindow.service';
import { TripsService } from '../../shared/Trips.service';

@Component({
  selector: 'trips',
  templateUrl: './trips.template.html',
  styleUrls: ['./trips.scss']
})

export class TripsComponent implements OnInit {

  tripsType = ['booking', 'trip-offer'];

  pendingTrips: any;
  currentTrips: any;

  constructor (private _ModalWindowService: ModalWindowService,
               private _TripsService: TripsService,
               private _Router: Router){}

  ngOnInit() {
    this._TripsService.getPrivateBookings()
      .then(privateBookings => this.pendingTrips = privateBookings)
      .catch(error => console.log(error));

    this._TripsService.getPrivateTrips()
      .then(privateTrips => this.currentTrips = privateTrips)
      .catch(error => console.log(error));
  }

  createTripOffer() :void {
    this._ModalWindowService.openModal('create-trip');
  }

  goToTripPage($event: any): void {
    this._Router.navigateByUrl(`trip/${$event}`);
  }
}
