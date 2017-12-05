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
  totalTrips:any;

  userSub: any;
  user: any;

  location: any;

  reviewer: any;

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
      if (this.type === 'locals' || this.type === 'local')
          this.city = changes.data.currentValue.area ? changes.data.currentValue.area
            : `${changes.data.currentValue.city.name}, ${changes.data.currentValue.city.country.name}`;

      if (this.type === 'booking')
      this._TripsService.getTrip(this.data.trip_id || this.data.id)
        .then(trip => this.trip = trip)
        .catch(error => console.error(error))
      if (this.type === 'city')
      this._AreaService.getCity(this.data)
        .then(city => {
          this.location = city;
          setTimeout(() => {
            this._TripsService.getTripsByCity(city.id)
              .then(trips => this.totalTrips = trips.total)
              .catch(error => console.error(error));
          }, 50)
        }).catch(error => console.error(error))
      if (this.type === 'review')
        this._UserService.getUserById(this.data.user_id)
          .then(reviewer => this.reviewer = reviewer)
          .catch(error => console.error(error));
    }
  }

  clicked($event?: any): void {
    if (this.type === 'locals' || this.type === 'local')
      this.clickEmitter.emit(this.data.user.id);
    if (this.type === 'trip-offer')
      this.clickEmitter.emit(this.data.id);
    if (this.type === 'booking') {
      console.log($event);
      this.clickEmitter.emit($event);
    }
    if (this.type === 'city')
      this.clickEmitter.emit(this.location.name);
  }

  handleAction(actionType: string): void {
    this.actionEmitter.emit({'id': this.data.id, 'action': actionType})
  }

  ngOnDestroy() {
    if (this.userSub)
      this.userSub.unsubscribe();
  }
}
