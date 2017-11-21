import { Component } from '@angular/core';

import { ParamsService } from '../shared/params.service';
import { UserService } from '../shared/User.service';
import { LocalsService } from '../shared/Locals.service';
import { ModalWindowService } from '../shared/modalWindow.service';


@Component({
  selector: 'user',
  templateUrl: './user.template.html',
  styleUrls: ['./user.scss']
})

export class UserComponent {
  user: any;

  isGuest: boolean = false;
  isUser: boolean = false;
  paramsSub: any;
  params:any;

  userSub: any;

  constructor (private _ParamsService: ParamsService,
               private _UserService: UserService,
               private _LocalService: LocalsService,
               private _ModalWindowService: ModalWindowService) {
    this.paramsSub = this._ParamsService.paramsObs.subscribe(params => {
      if (params && params.currentModule === 'user') {
        this.params = params;
        if (this.params.path !== '/')
        this._UserService.getUserById(this.params.path)
          .then(user => {
            this.isUser = (this._UserService.user && this._UserService.user.email ? this._UserService.user.email === user.email : false);
            this.isGuest = this._UserService.isGuest();

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

  localApply(): void {
    this._ModalWindowService.openModal('apply');
  }
}
