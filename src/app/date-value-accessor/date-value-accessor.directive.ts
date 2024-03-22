import { Directive, ElementRef, HostListener, Provider, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const DATE_VALUE_PROVIDER: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => DateValueAccessorDirective),
  multi: true
}
@Directive({
  selector: 'input([type=date])[ngModel],input([type=date])[formControl],input([type=date])[formControlName]',
  standalone: true,
  providers: [DATE_VALUE_PROVIDER]
})
export class DateValueAccessorDirective implements ControlValueAccessor {
  @HostListener('input', ['$event.target.valueAsDate']) private onChange!: Function;
  @HostListener('blur', []) private onTouched!: Function;

  constructor(private element: ElementRef) { }

  registerOnChange(fn: Function): void {
    this.onChange = (valueAsDate: Date) => {
      fn(valueAsDate);
    }
  }

  writeValue(newValue: any): void {
    if (newValue instanceof Date)
      this.element.nativeElement.value = newValue.toISOString().split('T')[0];
  }

  registerOnTouched(fn: Function): void {
    this.onTouched = fn;
  }
}
