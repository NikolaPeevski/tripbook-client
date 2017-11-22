import { Component } from '@angular/core';

import { ModalWindowService } from '../../shared/modalWindow.service';


@Component({
  selector: 'ratedTrips',
  templateUrl: './RatedTrips.template.html'
  // styleUrls: ['./trips.scss']
})

export class RatedTripsComponent {

  constructor (private _ModalWindowService: ModalWindowService){}

}
