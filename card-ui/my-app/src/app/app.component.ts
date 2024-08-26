import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ServiceService } from './service.service';
import { CommonModule } from '@angular/common';
import { ModalService } from './modal.service';
import { CardModal } from './modals/card-modal.component';
import { FormsModule } from '@angular/forms';
import { Filters } from './filters.model';
import { Views } from './views.enum';

@Component({
  imports: [CommonModule, FormsModule],
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  colors: any = [
    'W',
    'U',
    'B',
    'R',
    'G'
  ];
  cards: any = [];
  filteredColors: any = [];
  newdata: any;
  card: any;
  searchText: any;
  filters: Filters = {
    searchText: null
  };
  views: any = Views;
  currentView: any = Views.CARD_VIEW;

  constructor(private _apiservice:ServiceService, private modalService: ModalService) { }

  ngOnInit() {
	  this.getData();
    this.getCards();
  }

  getData() {
    this._apiservice.getCards(this.filters).then((result: any) => {
      this.cards = result;
    });
  }

  initFilters(): void {
    this.filters = {
      searchText: null
    }
  }

  getCards() {
    this._apiservice.getCard().then((result: any) => {
      this.card = result;
    });
  }

  setColorIdentity(color: string): void {
    this.filteredColors.push(color);
  }

  changeListener(file: any): void {
    this._apiservice.importCards(file.target.files[0]);
  }

  changeView(view: any): void {
    this.currentView = view;
  }

  submit(): void {
    this._apiservice.getCardsFromApi().then((result: any) => {
      this.cards = result;
      console.log(this.cards);
      let userCards: any = [];
      for (let card of this.cards) {
        console.log(card && card.purchase_uris ? card.purchase_uris['tcgplayer'] : card.name)
        
        userCards.push({
          id: null, 
          cardName: card.name, 
          scryfallId: card.id,
          foil: card.foil,
          imageUri: card && card.image_uris ? card.image_uris['normal'] : card.card_faces ? card.card_faces[0].image_uris['normal'] : null,
          setId: card.set,
          setName: card.set_name,
          setUri: card.set_uri,
          price: card.prices['usd'],
          artist: card.artist,
          mana_cost: card.mana_cost,
          tcgUri: card && card.purchase_uris ? card.purchase_uris['tcgplayer'] : null,
          cardType: card.line_type,
          colors: card.color_identity
        });
      }

      this._apiservice.postCards(userCards);
    })

  }

  search(): void {
    console.log(this.filters)
    this.getData();
  }

  clear(): void {
    this.initFilters();
    this.getData();
  }

  openModal(card: any): void {
    const modalRef = this.modalService.openModal(CardModal, false);
    modalRef.componentInstance.card = card;
  }
}
