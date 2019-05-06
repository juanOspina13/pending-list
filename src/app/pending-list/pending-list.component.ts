import { Component, OnInit, Directive, Input, Output, ViewChildren, QueryList, EventEmitter, AfterViewInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, debounceTime, tap } from 'rxjs/operators';

import { FormControl } from '@angular/forms';

interface HearingPendingList {
  reservationId: number;
  description: string;
  courtRoomName: string;
  detaineeRoomName: string;
  handcuffs: boolean;
  supervision: boolean;
  youth: boolean;
  needsInterpreter: boolean;
  breachOfBailDVPO: boolean;
  countDownTime: number;
  statusId: number;
  status: string;
  priority: number;
  additionalInformation: Object;
}

const PENDING_HEARINGS: HearingPendingList[] = [
  {
    reservationId: 1,
    description: "Juan Trial Hearing",
    courtRoomName: " GTL North Conference Room",
    detaineeRoomName: "Juan",
    handcuffs: true,
    supervision: true,
    youth: true,
    needsInterpreter: true,
    breachOfBailDVPO: true,
    countDownTime: 10,
    statusId: 1,
    status: "Ready",
    priority: 1,
    additionalInformation: { collapsed: true }
  },
  {
    reservationId: 2,
    description: "Duck Donald Trial Hearing",
    courtRoomName: "GTL Court Room",
    detaineeRoomName: "Duck Donald",
    handcuffs: true,
    supervision: true,
    youth: true,
    needsInterpreter: true,
    breachOfBailDVPO: true,
    countDownTime: 10,
    statusId: 1,
    status: "Ready",
    priority: 2,
    additionalInformation: { collapsed: true }

  },
];

export type SortDirection = 'asc' | 'desc' | '';
const rotate: { [key: string]: SortDirection } = { 'asc': 'desc', 'desc': '', '': 'asc' };
export const compare = (v1, v2) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

export interface SortEvent {
  column: string;
  direction: SortDirection;
}

@Directive({
  selector: "th[sortable]",
  host: {
    '[class.asc]': 'direction === "asc"',
    '[class.desc]': 'direction === "desc"',
    '(click)': 'rotate()'
  }
})
export class NgbdSortableHeaderDirective {

  @Input() sortable: string;
  @Input() direction: SortDirection = '';
  @Output() sort = new EventEmitter<SortEvent>();

  rotate() {
    this.direction = rotate[this.direction];
    this.sort.emit({ column: this.sortable, direction: this.direction });
  }
}

@Component({
  selector: 'app-pending-list',
  templateUrl: './pending-list.component.html',
  styleUrls: ['./pending-list.component.css']
})
export class PendingListComponent implements OnInit, AfterViewInit {

  pendingHearings = PENDING_HEARINGS;

  @ViewChildren(NgbdSortableHeaderDirective) headers: QueryList<NgbdSortableHeaderDirective>;

  collapsed: boolean = true;

  pendingHearings$: Observable<HearingPendingList[]>;

  searchFilter = new FormControl('');

  loading = false;

  ngAfterViewInit() {

  }
  onSort({ column, direction }: SortEvent) {
    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    // sorting countries
    if (direction === '') {
      this.pendingHearings = PENDING_HEARINGS;
    } else {
      this.pendingHearings = [...PENDING_HEARINGS].sort((a, b) => {
        const res = compare(a[column], b[column]);
        return direction === 'asc' ? res : -res;
      });
    }
  }

  constructor() {
    this.pendingHearings$ = this.searchFilter.valueChanges.pipe(
      tap(val => {
        this.loading = true;
      }),
      debounceTime(600),
      map(text => this.setHearingName(text)),
      tap(val => {
        this.loading = false;
      })
    );
  }

  ngOnInit() {

  }

  setHearingName(text) {

    if (text && text.length > 0) {
      return [{
        reservationId: 1,
        description: text + " end",
        courtRoomName: " GTL North Conference Room",
        detaineeRoomName: "Juan",
        handcuffs: true,
        supervision: true,
        youth: true,
        needsInterpreter: true,
        breachOfBailDVPO: true,
        countDownTime: 10,
        statusId: 1,
        status: "Ready",
        priority: 1,
        additionalInformation: { collapsed: true }
      }];
    } else {
      return this.pendingHearings;
    }


  }

  toggleCollapsed(pendingHearing) {
    pendingHearing.additionalInformation.collapsed = !pendingHearing.additionalInformation.collapsed;
  }
  trackByFn(index) {
  }

}

