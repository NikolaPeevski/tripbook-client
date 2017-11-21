import { Component, Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import {FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import { AreaService } from '../../Area.service';
import { LocalsService } from '../../Locals.service';
import { UserService } from '../../User.service';
import { TripsService } from '../../Trips.service';


@Component({
  selector: 'modalWindow',
  templateUrl: './modalWindow.template.html'
})
export class modalWindowComponent {

  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;

  isChecked: boolean = false;
  afterClosedSub: any;
  autocomplete: any =  [];
  searchSub: any;
  keyUp =  new Subject<string>();

  type: string = 'apply';

  background: string = '';
  quote: string = '';
  city: string = '';

  selectedCity: any;

  constructor(private dialogRef: MatDialogRef<modalWindowComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private _formBuilder: FormBuilder,
              private _AreaService: AreaService,
              private _LocalsService: LocalsService,
              private _UserService: UserService) {
                this.searchSub = this.keyUp
                .map(event => event['target'].value)
                .debounceTime(250)
                .distinctUntilChanged()
                .flatMap(search => Observable.of(search).delay(250))
                .subscribe(this.onKeyUp.bind(this));


                this.type = this.data.type || 'apply';
                this.selectedCity = this.data.cityName || '';
              }


  ngOnInit() {
  this.firstFormGroup = this._formBuilder.group({
    background: new FormControl(this.background),
    quote: new FormControl(this.quote)
  });
  this.secondFormGroup = this._formBuilder.group({
    city: new FormControl(this.city)
  });
}

processData(): void {
  if (this.selectedCity) {
  this._LocalsService.createLocal(this.selectedCity.id, this.background, this.quote)
    .then(response => this._UserService.defineUser(response))
    .catch(error => console.error(error))
    .finally(() => this.dialogRef.close())
  }
}

selectCity(city: any) {

  if (this.selectedCity)
      this.selectCity = undefined;
  this.selectedCity = city;
}

checkedValue(value: any) {
  this.isChecked = value.checked || false;

  if (value)
    this.thirdFormGroup.setValidators(null);
  else this.thirdFormGroup.setValidators(Validators.required);

  }

  onKeyUp(input: string): void {
    if (!input) return;

    this._AreaService.searchAreas(input, true)
      .then(data => this.autocomplete = data)
      .catch(error => console.error(error));
  }

  optionSelected($event: any): void {

  }

  ngOnDestroy() {
    if (this.searchSub)
      this.searchSub.unsubscribe();
    if (this.afterClosedSub)
      this.afterClosedSub.unsubscribe();
  }
}
