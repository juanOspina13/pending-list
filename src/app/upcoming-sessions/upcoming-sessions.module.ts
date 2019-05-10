import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SessionComponent } from '../session/session.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    SessionComponent
  ],
  exports: [SessionComponent]

})
export class UpcomingSessionsModule { }
