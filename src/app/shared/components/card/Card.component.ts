import { Component, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';

import { AreaService } from '../../Area.service';

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

  private city: string = '';

  constructor (private _AreaService: AreaService){

  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.data && changes.data.currentValue) {
      
      if (this.type === 'locals')
      this._AreaService.getCity(changes.data.currentValue.city_id)
        .then(city => this.city = `${city.name}, ${city.country.name}`)
        .catch(error => console.error(error));
    }
  }

  clicked(): void {
    if (this.type === 'locals')
      this.clickEmitter.emit(this.data.user.id);
  }
}
