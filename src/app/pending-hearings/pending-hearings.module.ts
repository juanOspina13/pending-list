import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';
import { HearingMainInformationComponent } from '../hearing/hearing-main-information/hearing-main-information.component';
import { HearingAdditionalInformationComponent } from '../hearing/hearing-additional-information/hearing-additional-information.component';
import { UpcomingSessionsComponent } from '../upcoming-sessions/upcoming-sessions.component';
import { PendingHearingComponent } from './pending-hearings.component';
import { UpcomingSessionsModule } from '../upcoming-sessions/upcoming-sessions.module';
import { TableSortableDirective } from '../shared/table-sorting/table-sortable-directive';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    HttpClientModule,
    NgxSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
    NgbPaginationModule,
    ToastrModule.forRoot({
      timeOut: 10000
    }),
    SweetAlert2Module.forRoot(),
    CommonModule,
    UpcomingSessionsModule
  ],
  declarations: [
    PendingHearingComponent,
    UpcomingSessionsComponent,
    HearingMainInformationComponent,
    HearingAdditionalInformationComponent,
    TableSortableDirective
  ],
  exports: [PendingHearingComponent]
})
export class PendingHearingsModule { }
