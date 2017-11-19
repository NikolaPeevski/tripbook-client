import { Component } from '@angular/core';

import { ParamsService } from '../shared/params.service';
import { UserService } from '../shared/User.service';
import { LocalsService } from '../shared/Locals.service';


@Component({
  selector: 'user',
  templateUrl: './user.template.html',
  styleUrls: ['./user.scss']
})

export class UserComponent {
  private user: any;

  paramsSub: any;
  params:any;

  constructor (private _ParamsService: ParamsService,
               private _UserService: UserService,
               private _LocalService: LocalsService) {
    this.paramsSub = this._ParamsService.paramsObs.subscribe(params => {
      if (params) {
        this.params = params;
        this._UserService.getUserById(this.params.path.substr(1))
          .then(user => {
            if (user.has_local)
              setTimeout( () => {this._LocalService.getLocalById(user.local_id)
                .then(local => this.user = local)
                .catch(error => console.error(error)) }, 50);
              else this.user = user;
          }).catch(error => console.error(error));

      }
    });
  }

  ngOnDestroy() {
    if (this.paramsSub)
      this.paramsSub.unsubscribe();
  }
}
