import { Component, Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'modalWindow',
  templateUrl: './modalWindow.template.html'
})
export class modalWindowComponent {

  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;

  constructor(private dialogRef: MatDialogRef<modalWindowComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private _formBuilder: FormBuilder) {}

  onClose(): void {

  }

  ngOnInit() {
  this.firstFormGroup = this._formBuilder.group({
    firstCtrl: ['']
  });
  this.secondFormGroup = this._formBuilder.group({
    secondCtrl: ['']
  });
  this.thirdFormGroup = this._formBuilder.group({
    thirdCtrl: ['']
  });
}
}
