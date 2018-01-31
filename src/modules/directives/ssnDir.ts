import { Directive, HostListener, ElementRef, OnInit } from '@angular/core';
import { NgControl, NgModel } from '@angular/forms';
import { FieldType } from '@ngx-formly/core';

@Directive({
	selector: '[appSsn]'
})
export class SsnMaskDirective implements OnInit {
	private temp;

	constructor(private el: ElementRef) {}

	@HostListener('focus', [ '$event' ])
	onFocus($event) {
		if (this.temp != null) {
			this.el.nativeElement.value = this.temp;
		}
	}

	@HostListener('blur', [ '$event' ])
	onBlur(tar) {
		this.temp = this.el.nativeElement.value;
		const regxa = /^(\d{3}-?\d{2}-?\d{4})$/;
		if (regxa.test(this.el.nativeElement.value)) {
			this.el.nativeElement.value = 'XXX-XX' + this.temp.slice(6);
		}
	}

	ngOnInit() {
		setTimeout(() => {
			if (this.el.nativeElement.value.length > 0) {
				this.el.nativeElement.focus();
				this.el.nativeElement.blur();
			}
		}, 1000);
	}
}
