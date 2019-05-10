import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { AppActionsCommunicationService } from './app.communication.service';
import { PendingHearingsModule } from './pending-hearings/pending-hearings.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    NgbModule.forRoot(),
    BrowserModule,
    CommonModule,
    BrowserAnimationsModule,
    PendingHearingsModule,
  ],
  providers: [
    AppActionsCommunicationService,
  ],
  bootstrap: [AppComponent],
  entryComponents: []
})
export class AppModule { }
