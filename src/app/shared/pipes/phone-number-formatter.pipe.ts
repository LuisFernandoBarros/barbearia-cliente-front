import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatar'
})
export class PhoneNumberFormatterPipe implements PipeTransform {

  transform(phone: string): string {
    phone = phone.charAt(0) != "0" ? "0" + phone : "" + phone;

    let phoneOut = "(" + phone.substr(0, 3) + ") ";
    phoneOut += phone.substr(3, 5) + "-";
    phoneOut += phone.substr(8, phone.length - 5);

    return phoneOut;
  }


}
