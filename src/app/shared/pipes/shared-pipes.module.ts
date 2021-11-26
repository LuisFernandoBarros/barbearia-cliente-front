import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PhoneNumberFormatterPipe } from './phone-number-formatter.pipe';
import { StringToHourFormatterPipe } from './string-to-hour-formatter.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [
    PhoneNumberFormatterPipe,
    StringToHourFormatterPipe
  ],
  exports: [
    PhoneNumberFormatterPipe,
    StringToHourFormatterPipe
  ]
})
export class SharedPipesModule { }
