import { DatePipe } from '@angular/common';
import { TYPED_NULL_EXPR } from '@angular/compiler/src/output/output_ast';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customDataPipe'
})
export class CustomDataPipePipe implements PipeTransform {
  pipe = new DatePipe('en-US');
  transform(object: any, key: string, ...args: unknown[]): unknown {
    if (object[key].includes('T18:00:00.000Z')) {
      return this.pipe.transform(object[key], 'MM/dd/yyyy')
    } else {
      return object[key]
    }
  }

}
