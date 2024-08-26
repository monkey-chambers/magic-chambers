import { CommonModule } from "@angular/common";
import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { ServiceService } from "../service.service";

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'card-modal.component',
  templateUrl: 'card-modal.component.html',
  styleUrls: ['card-modal.component.scss']
})
export class CardModal implements OnInit, OnDestroy {
  @Input() card: any;

  arts: any = []

  constructor(private ngbActiveModal: NgbActiveModal, private cardService: ServiceService) {}

  ngOnInit(): void {
    this.cardService.getAltArts(this.card).then((result: any) => {
      console.log(result[0]);
        this.cardService.getAltArts2(result[0].prints_search_uri).then((result2: any) => {
          for (let card of result2.data) {
            this.arts.push(card.image_uris['normal']);
          }
        });
    });
  }

  ngOnDestroy() {

  }

  closeModal() {
    this.ngbActiveModal.dismiss();
  }

  buyCard(url: string) {
    window.location.href = url;
  }
}