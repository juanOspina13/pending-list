import { Component, OnInit, Directive, Input, Output, ViewChildren, QueryList, EventEmitter, AfterViewInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, debounceTime, tap, catchError } from 'rxjs/operators';

import { FormControl } from '@angular/forms';
import { HearingI } from '../hearing/hearingI';
import { SessionService } from '../session.service';
import { TableSortableDirective, SortDirection } from '../shared/table-sorting/table-sortable-directive';
import { TableSortingSortEvent } from '../shared/table-sorting/table-sorting-sort-event';
import { PendingHearingsI } from './pending-hearings-interface';


const rotate: { [key: string]: SortDirection } = { 'asc': 'desc', 'desc': '', '': 'asc' };
export const compare = (v1, v2) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;




@Component({
  selector: 'app-pending-hearings',
  templateUrl: './pending-hearings.component.html',
  styleUrls: ['./pending-hearings.component.css']
})
export class PendingHearingComponent implements AfterViewInit {

  pendingHearings = [];

  @ViewChildren(TableSortableDirective) headers: QueryList<TableSortableDirective>;

  collapsed = true;

  pendingHearings$: Observable<PendingHearingsI[]>;

  searchFilter = new FormControl('');

  loading = false;

  dragging = false;

  /*
  Paging Parameters
  page  = 2;

  pageSize  = 10;

  collectionSize  = 35;
  */

  constructor(protected sessionService: SessionService) {
    this.searchFilter.valueChanges.pipe(
      tap(val => {
        this.loading = true;
      }),
      debounceTime(600),
      map(text => this.searchHearings(text, "")),
      catchError(() => {
        return of([]);
      }),
      tap(val => {
        this.loading = false;
      })
    ).subscribe();
  }

  ngAfterViewInit() {

    this.searchHearings("", "");

  }

  onSort({ column, direction }: TableSortingSortEvent) {
    this.searchHearings(this.searchFilter.value, `${column},${direction}`);

  }

  formatPendingListObject(pendingListHearings: Array<HearingI>): Array<PendingHearingsI> {
    const formatedPendingListHearings: Array<PendingHearingsI> = [];
    for (const pendingHearing of pendingListHearings) {
      const formatedPendingHearing: PendingHearingsI = {
        collapsed: true,
        hearingObject: pendingHearing,
        hearingObjectDetails: {
          hearingParticipants: [],
          additionalInformation: null
        }
      };
      formatedPendingListHearings.push(formatedPendingHearing);
    }
    return formatedPendingListHearings;

  }

  searchHearings(filter: string, sortCriteria: string) {
    return this.sessionService.searchHearings(filter, sortCriteria).subscribe(pendingHearings => {
      if (pendingHearings && pendingHearings.hearings) {
        this.pendingHearings = this.formatPendingListObject(pendingHearings.hearings);
      }
    });
  }

  dragEnabled() {
    return true;
  }

  getAllData() {
    return {};
  }
}

