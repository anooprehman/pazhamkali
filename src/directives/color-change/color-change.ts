import { Directive, ElementRef, HostListener, Input } from '@angular/core';

/**
 * Generated class for the ColorChangeDirective directive.
 *
 * See https://angular.io/api/core/Directive for more info on Angular
 * Directives.
 */
@Directive({
  selector: '[colorChange]' // Attribute selector
})
export class ColorChangeDirective {
  @Input('colorChange') color: string;
  constructor(private el:ElementRef) {
  }

 
  
  highlight(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
  }

  border(color: string) {
    this.el.nativeElement.style.border = "1px solid "+color;
  }

}
