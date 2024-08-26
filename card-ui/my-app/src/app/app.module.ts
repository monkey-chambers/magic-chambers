import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { ServiceService } from "./service.service";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { CommonModule } from "@angular/common";
import { NgxCsvParser, NgxCsvParserModule } from "ngx-csv-parser";
import { ModalService } from "./modal.service";
import { CardModal } from "./modals/card-modal.component";
import { FormsModule } from "@angular/forms";

@NgModule ({
    declarations: [CardModal],
    imports: [
        CommonModule,
        NgxCsvParserModule,
        FormsModule
    ],
    providers: [ServiceService, ModalService],
    bootstrap: [AppComponent]
})
export class AppModule {}