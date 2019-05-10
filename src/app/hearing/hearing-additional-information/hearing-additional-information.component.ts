import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: '[hearing-additional-information]',
  templateUrl: './hearing-additional-information.component.html',
  styleUrls: ['./hearing-additional-information.component.css']
})
export class HearingAdditionalInformationComponent implements OnInit {
  @Input() pendingHearingDetails;

  constructor() { }

  ngOnInit() {
  }
}
