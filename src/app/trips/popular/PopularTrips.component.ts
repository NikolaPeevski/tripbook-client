import { Component } from '@angular/core';

import { ModalWindowService } from '../../shared/modalWindow.service';


@Component({
  selector: 'popularTrips',
  templateUrl: './PopularTrips.template.html'
  // styleUrls: ['./trips.scss']
})

export class PopularTripsComponent {

  constructor (private _ModalWindowService: ModalWindowService){}

}
