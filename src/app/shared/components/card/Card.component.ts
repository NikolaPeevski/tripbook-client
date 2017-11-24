import { Component, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';

import { AreaService } from '../../Area.service';
import { TripsService } from '../../Trips.service';
import { UserService } from '../../User.service';

@Component({
  selector: 'Card',
  templateUrl: './Card.template.html',
  styleUrls: ['./Card.scss']
})

export class CardComponent {

  @Input() size: any;
  @Input() type: any;
  @Input() data: any;

  @Output() clickEmitter = new EventEmitter<string>();

  @Output() actionEmitter = new EventEmitter<any>();

  private city: string = '';
  trip:any;

  userSub: any;
  user: any;

  constructor (private _AreaService: AreaService,
               private _TripsService: TripsService,
               private _UserService: UserService){

               this.userSub = this._UserService.currentUser.subscribe(user => {
                 if (user)
                  this.user = user;
                  
               });

  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.data && changes.data.currentValue) {
      console.log(changes);
      if (this.type === 'locals' || this.type === 'local')
      this._AreaService.getCity(changes.data.currentValue.city_id)
        .then(city => this.city = `${city.name}, ${city.country.name}`)
        .catch(error => console.error(error));

      if (this.type === 'booking')
      this._TripsService.getTrip(this.data.trip_id)
        .then(trip => this.trip = trip)
        .catch(error => console.error(error))
    }
  }

  clicked($event?: any): void {
    if (this.type === 'locals' || this.type === 'local')
      this.clickEmitter.emit(this.data.user.id);
    if (this.type === 'trip-offer')
      this.clickEmitter.emit(this.data.id);
    if (this.type === 'booking') {
      this.clickEmitter.emit($event);
    }
  }

  handleAction(actionType: string): void {
    this.actionEmitter.emit({'id': this.data.id, 'action': actionType})
  }

  ngOnDestroy() {
    if (this.userSub)
      this.userSub.unsubscribe();
  }
}
