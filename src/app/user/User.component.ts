import { Component } from '@angular/core';

import { ParamsService } from '../shared/params.service';
import { UserService } from '../shared/User.service';
import { LocalsService } from '../shared/Locals.service';
import { ModalWindowService } from '../shared/modalWindow.service';
import { ReviewService } from '../shared/Review.service';


@Component({
  selector: 'user',
  templateUrl: './user.template.html',
  styleUrls: ['./user.scss']
})

export class UserComponent {
  user: any;
  local: any;

  isGuest: boolean = false;
  isUser: boolean = false;
  isLocal: boolean = false;
  paramsSub: any;
  params:any;

  userSub: any;
  externalUser: any;

  tab: any = 'Details';

  reviews: any = [];


  constructor (private _ParamsService: ParamsService,
               private _UserService: UserService,
               private _LocalService: LocalsService,
               private _ModalWindowService: ModalWindowService,
               private _ReviewService: ReviewService) {

    this.paramsSub = this._ParamsService.paramsObs.subscribe(params => {
      if (params && params.currentModule === 'user') {
        this.params = params;
        if (this.params.path !== '/')
        this._UserService.getUserById(this.params.path)
          .then(user => {
            this.isGuest = this._UserService.isGuest();

            if (user.has_local) {
              setTimeout( () => {this._LocalService.getLocalById(user.local_id)
                .then(local => {
                  this.local = local;
                  this.user = local.user;
                  this.isUser = true;
                  this.isLocal = true;
                  console.log(this.isLocal)
                })
                .catch(error => console.error(error)) }, 50);

            } else {
              // Quick fix due to time.
              this.user = user;
              this.local = user;
            };
          }).catch(error => console.error(error))
          .finally(() => {
              setTimeout(() => {
                this.isUser =  (this._UserService.user.email ? this.local.local ? this._UserService.user.email === this.local.user.email : this._UserService.user.email === this.user.email : false);
                this.isGuest = this._UserService.isGuest();
              }, 150);
          });
        }
    });

    this.userSub = this._UserService.currentUser.subscribe(user => {
      if (user) {
        this.externalUser = user;
      }
    })
  }

  ngOnDestroy() {
    if (this.paramsSub)
      this.paramsSub.unsubscribe();
    if (this.userSub)
      this.userSub.unsubscribe();
  }

  localApply(): void {
    this._ModalWindowService.openModal('apply');
  }

  bookATrip(): void {
    this._ModalWindowService.openModal('book', null, this.local.id);
  }

  changeTab($event): void {
    this.tab = $event;

    if ($event === 'Reviews')
      this._ReviewService.getReview('local', this.local.id)
        .then(reviews => this.reviews = reviews.reviews)
        .catch(error => console.error(error));
  }

  createReview(): void {
    this._ModalWindowService.openModal('review', null, this.local.id);
  }
}
