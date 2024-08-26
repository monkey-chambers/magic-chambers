import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { ServiceService } from './service.service';
import { CommonModule } from '@angular/common';
import { NgxCsvParserModule } from 'ngx-csv-parser';
import { ModalService } from './modal.service';
import { FormsModule } from '@angular/forms';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideClientHydration(), provideHttpClient(), ServiceService, ModalService, CommonModule, BrowserModule, NgxCsvParserModule, FormsModule]
};
