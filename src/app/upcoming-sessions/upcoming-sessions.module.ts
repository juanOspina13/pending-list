import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SessionComponent } from '../session/session.component';
import { NgDragDropModule } from 'ng-drag-drop';

@NgModule({
  imports: [
    CommonModule,
    NgDragDropModule.forRoot(),
  ],
  declarations: [
    SessionComponent
  ],
  exports: [SessionComponent]

})
export class UpcomingSessionsModule { }
