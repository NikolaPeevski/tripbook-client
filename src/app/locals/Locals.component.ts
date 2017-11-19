import { Component } from '@angular/core';

import { LocalsService } from '../shared/Locals.service';
import { Router } from '@angular/router';


@Component({
  selector: 'locals',
  templateUrl: './locals.template.html',
  styleUrls: ['./locals.scss']
})

export class LocalsComponent {

  locals: any = [];
  size: string = 's';

  constructor (private _LocalsService: LocalsService,
               private _Router: Router){
  this._LocalsService.getLocals()
    .then(response => this.locals = response.locals)
    .catch(error => console.error(error));
  }

  goToProfilePage(id: string): void {
    this._Router.navigateByUrl(`user/${id}`);
  }
}
