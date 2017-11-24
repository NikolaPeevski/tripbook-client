import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Constants } from '../../shared/Constants';

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

  tab: string = 'Upcoming';
  results: any = [];

  constructor (private _ModalWindowService: ModalWindowService,
               private _TripsService: TripsService,
               private _Router: Router){}

  ngOnInit() {
    this.loadTrips();
  }

  createTripOffer() :void {
    this._ModalWindowService.openModal('create-trip');
  }

  goToTripPage($event: any): void {
    this._Router.navigateByUrl(`trip/${$event}`);
  }

  goToPage($event: any): void {
    if ($event.type === 'trip')
      return this.goToTripPage($event.id)
    if ($event.type === 'user')
      this._Router.navigateByUrl(`user/${$event.id}`);
  }

  handleTrip($event: any): void {
    this._TripsService.handleBooking($event.id, $event.action)
      .then(booking => this.loadTrips())
      .catch(error => console.error(error));
  }

  loadTrips():void {
    this._TripsService.getPrivateBookings()
      .then(privateBookings => {
        this.pendingTrips = privateBookings
        this.changeTab(this.tab);
      }).catch(error => console.log(error));

    this._TripsService.getPrivateTrips()
      .then(privateTrips => this.currentTrips = privateTrips)
      .catch(error => console.log(error));
  }

  changeTab(tab: string): void {
    this.tab = tab;
    let results = this.pendingTrips.filter(el => el.status === Constants.BOOKING_STATUS[tab]);
    if (tab === 'Completed' || tab === 'Upcoming') {

      let date = new Date();
      results = results.filter(el => tab === 'Completed' ? date > (new Date(el.to_date)) : (new Date(el.to_date)) >= date)
    }
    this.results = results;

  }
}
