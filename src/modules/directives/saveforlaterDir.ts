import { Directive, HostListener, ElementRef, Renderer, Output,EventEmitter, ViewChild } from "@angular/core";
import { SimpleModalService } from "ngx-simple-modal";
import { SaveForLaterModal } from "modules/modal/saveforLaterModal";



@Directive({
  selector: "[saveforLaterClick]"
})

export class saveforLater {
  @Output() saveforLaterClick = new EventEmitter();
  promptMessage:any;
  constructor(private SimpleModalService: SimpleModalService) {}

  @HostListener("click", ["$event"])
  onClick() {
    this.SimpleModalService.addModal(SaveForLaterModal,{}, { closeOnEscape:false,closeOnClickOutside:false});
  }
}