import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'date'
})
export class DatePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let date = value

    date = date.split(' ')

    let tmp = date[0].split('-')
    let newDate = tmp[tmp.length-1]

    for (let i = tmp.length-2; i >= 0 ; i--) {
      newDate += tmp[i]
    }
    newDate = newDate.replace(/(\d{4})(\d{2})(\d+)/, "$1-$2-$3") + ' ' + date[1]

    return new Date(newDate)
  }

}
