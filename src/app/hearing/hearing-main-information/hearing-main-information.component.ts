import { Component, OnInit, Input } from '@angular/core';
import { SessionService } from 'src/app/session.service';

@Component({
  selector: '[hearing-main-information]',
  templateUrl: './hearing-main-information.component.html',
  styleUrls: ['./hearing-main-information.component.css']
})
export class HearingMainInformationComponent implements OnInit {
  @Input() pendingHearing;

  loading = false;
  constructor(protected sessionService: SessionService) {
  }

  ngOnInit() {
  }

  toggleCollapsed() {
    this.pendingHearing.collapsed = !this.pendingHearing.collapsed;
    if (
      !this.pendingHearing.collapsed &&
      this.pendingHearing.hearingObject &&
      this.pendingHearing.hearingObject.id > 0
    ) {
      this.getHearingDetails(this.pendingHearing.id);
    }
  }

  getHearingDetails(hearingId: number) {
    this.loading = true;
    this.sessionService.getHearingDetails(hearingId)
      .subscribe(hearingDetail => {
        if (hearingDetail) {
          setTimeout(() => {
            this.loading = false;

            this.pendingHearing.hearingObjectDetails = hearingDetail;
          }, 1000);
        }
      });
  }

}
