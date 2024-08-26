import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { NgxCsvParser, NgxCSVParserError } from 'ngx-csv-parser';
import { Filters } from "./filters.model";

@Injectable()
export class ServiceService {
  header: boolean = false;
  csvRecords: any;
  constructor(private _http: HttpClient, private ngxCsvParser: NgxCsvParser) { }

  getCards(filters: Filters) {
    let params: HttpParams = new HttpParams();
    if (filters.searchText) {
      params = params.append('searchText', filters.searchText);
    }

    return this._http.get('http://localhost:8080/', {params: params})
    .toPromise()
    .then((response: any) => {
      return response;
    })
  }

  postCards(cards: any) {
    return this._http.post('http://localhost:8080/', cards)
    .toPromise()
    .then((response: any) => {
      return response;
    });
  }


  getCard() {
    return this._http.get('https://api.scryfall.com/cards/lea/161').toPromise()
    .then((response: any) => {
      return response;
    });
  }

  importCards(csv: any) {
    this.header = (this.header as unknown as string) === 'true' || this.header === true;

    this.ngxCsvParser.parse(csv, { header: this.header, delimiter: ',', encoding: 'utf8' })
      .pipe().subscribe({
        next: (result): void => {
          this.csvRecords = result;
        },
        error: (error: NgxCSVParserError): void => {
          console.log('Error', error);
        }
      });
  }

  async getAltArts2(altUri: any): Promise<any> {
    console.log(altUri);
    let prints: any = []
    await this._http.get(altUri).toPromise().then((result: any) => {
      prints = result;
    })

    return prints;
  }

  async getAltArts(card: any): Promise<any> {
    let newCards: any = [];
    let splitString: any = card.cardName.split(" ");

    let url = 'https://api.scryfall.com/cards/named?exact=';
    url = url + encodeURIComponent(splitString);
    url = url + '&unique=art'

    await this._http.get(url).toPromise().then((result: any) => {
      newCards.push(result);
    });
    
    return newCards;
  }

  async getCardsFromApi(): Promise<void> {
    let cards: any = [];
    for (let card of this.csvRecords) {
      let url = 'https://api.scryfall.com/cards/named?exact=';
      let splitString: any = null
      splitString = card[1].split(" ");

      url = url + encodeURIComponent(splitString);
      await this._http.get(url).toPromise().then((result: any) => {
        cards.push(result);
      });
    }
    
    return cards;
  }
}
  

