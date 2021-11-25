import { Component, OnInit, Input } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';
import { FormValidations } from '../form-validations';

@Component({
  selector: 'app-error-msg',
  templateUrl: './error-msg.component.html',
  styleUrls: ['./error-msg.component.css']
})
export class ErrorMsgComponent implements OnInit {

  @Input() control!: AbstractControl | null;
  @Input() label!: string;

  constructor() { }

  ngOnInit() {
  }

  get errorMessage() {
    if(this.control == null){
      return null;
    }
    for (const propertyName in this.control.errors) {
      if (this.control.errors.hasOwnProperty(propertyName) &&
        this.control.touched) {
          return FormValidations.getErrorMsg(this.label, propertyName, this.control.errors[propertyName]);
        }
    }
    return null;
  }

}