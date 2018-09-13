import { Directive, HostListener, ElementRef, Renderer, Output, EventEmitter, ViewChild } from '@angular/core';
import { SimpleModalService } from 'ngx-simple-modal';
import { SaveForLaterModalComponent } from '../modal/saveforLaterModal';


@Directive({
	selector: '[appSaveforLaterClick]'
})
export class SaveforLaterDirective {
	@Output() saveforLaterClick = new EventEmitter();
	promptMessage: any;

	constructor(private SimpleModalService: SimpleModalService) {}

	@HostListener('click', [ '$event' ])
	onClick() {
		this.SimpleModalService.addModal(
			SaveForLaterModalComponent,
			{},
			{
				closeOnEscape: false,
				closeOnClickOutside: false
			}
		);
	}
}
