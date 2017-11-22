import { Component } from '@angular/core';

import { ModalWindowService } from '../../shared/modalWindow.service';


@Component({
  selector: 'trips',
  templateUrl: './trips.template.html',
  styleUrls: ['./trips.scss']
})

export class TripsComponent {

  constructor (private _ModalWindowService: ModalWindowService){}

  createTripOffer() :void {
    this._ModalWindowService.openModal('create-trip');
  }
}
