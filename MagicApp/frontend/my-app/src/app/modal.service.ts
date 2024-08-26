import { Injectable } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Injectable()
export class ModalService {
  constructor(private ngbModal: NgbModal) { }

  openModal(modal: any, fullscreen: boolean): any {
    let openModal = this.ngbModal.open(modal, {backdrop: 'static', windowClass: 'my-modal'});

    return openModal;
  }
}
  

