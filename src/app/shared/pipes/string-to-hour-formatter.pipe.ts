import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stringToHour'
})
export class StringToHourFormatterPipe implements PipeTransform {
  transform(tempo: number): string {
    return tempo.toString().substr(0,5);
  }
}
