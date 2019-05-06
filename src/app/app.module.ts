import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgDragDropModule } from 'ng-drag-drop';

import { AppComponent } from './app.component';

import { PendingListComponent, NgbdSortableHeaderDirective } from './pending-list/pending-list.component';
import { AppActionsCommunicationService } from './app.communication.service';

@NgModule({
  declarations: [
    AppComponent,
    PendingListComponent,
    NgbdSortableHeaderDirective
  ],
  imports: [
    NgbModule.forRoot(),
    BrowserModule,
    HttpClientModule,
    NgxSpinnerModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 10000
    }),
    SweetAlert2Module.forRoot(),
    NgDragDropModule.forRoot()

  ],
  providers: [
    AppActionsCommunicationService,
  ],
  bootstrap: [AppComponent],
  entryComponents: []
})
export class AppModule { }
