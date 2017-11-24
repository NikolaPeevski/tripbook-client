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
  forthFormGroup: FormGroup;

  isChecked: boolean = false;
  afterClosedSub: any;
  autocomplete: any =  [];
  searchSub: any;
  keyUp =  new Subject<string>();

  type: string = 'apply';

  background: string = '';
  quote: string = '';
  city: string = '';

  title: string = '';
  description: string = '';
  numberOfPeople: string = '';

  from_date: any;
  to_date: any;

  selectedCity: any;

  local_id: any;

  trip_id: any;

  constructor(private dialogRef: MatDialogRef<modalWindowComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private _formBuilder: FormBuilder,
              private _AreaService: AreaService,
              private _LocalsService: LocalsService,
              private _UserService: UserService,
              private _TripsService: TripsService) {
                this.searchSub = this.keyUp
                .map(event => event['target'].value)
                .debounceTime(250)
                .distinctUntilChanged()
                .flatMap(search => Observable.of(search).delay(250))
                .subscribe(this.onKeyUp.bind(this));


                this.type = this.data.type || 'apply';
                this.selectedCity = this.data.cityName || '';
                this.local_id = this.data.local_id || '';
                this.trip_id = this.data.trip_id || '';
                console.log(this.data);
              }


  ngOnInit() {
  this.firstFormGroup = this._formBuilder.group({
    background: new FormControl(this.background),
    quote: new FormControl(this.quote),
    title: new FormControl(this.title)
  });
  this.secondFormGroup = this._formBuilder.group({
    city: new FormControl(this.city),
    description: new FormControl(this.description)
  });
  this.thirdFormGroup = this._formBuilder.group({
    numberOfPeople: new FormControl(this.numberOfPeople)
  });
  this.forthFormGroup = this._formBuilder.group({
    from: new FormControl({'value': this.from_date, disabled: true}, Validators.required),
    to: new FormControl({'value': this.to_date, disabled: true}, Validators.required)
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

  bookALocal():void {

    this._TripsService.bookALocal(this.forthFormGroup['_value'].from, this.forthFormGroup['_value'].to, this.numberOfPeople,
    this.firstFormGroup['_value'].title, this.secondFormGroup['_value'].description, this.local_id)
    .then(booking => console.log(booking))
    .catch(error => console.error(error))
    .finally(() => this.dialogRef.close());
  }

 createATrip(): void {
   this._TripsService.createTrip({'title': this.firstFormGroup['_value'].title, 'description': this.secondFormGroup['_value'].description, 'numberOfPeople': this.numberOfPeople})
     .then(trip => console.log(trip))
     .catch(error => console.error(error))
     .finally(() => this.dialogRef.close());
 }

 bookATrip(): void {
   this._TripsService.bookATrip(this.forthFormGroup['_value'].from, this.forthFormGroup['_value'].to, this.numberOfPeople, this.trip_id)
     .then(booking => console.log(booking))
     .catch(error => console.error(error))
     .finally(() => this.dialogRef.close());
 }


 requestATrip(): void {
   this._AreaService.searchAreas(this.selectedCity, true)
    .then(city => {
      setTimeout(() => {
         this._TripsService.requestATrip(this.forthFormGroup['_value'].from, this.forthFormGroup['_value'].to, this.numberOfPeople,
         this.firstFormGroup['_value'].title, this.secondFormGroup['_value'].description, city[0].id)
         .then(booking => console.log(booking))
         .catch(error => console.error(error))
         .finally(() => this.dialogRef.close());
       }, 50);
  }).catch(error => console.error(error));
 }

 selectNumberOfPeople(value: string): void {
   this.numberOfPeople = value;
 }

  ngOnDestroy() {
    if (this.searchSub)
      this.searchSub.unsubscribe();
    if (this.afterClosedSub)
      this.afterClosedSub.unsubscribe();
  }
}
