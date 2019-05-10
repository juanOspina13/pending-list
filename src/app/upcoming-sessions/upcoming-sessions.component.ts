import { Component, OnInit } from '@angular/core';
import { SessionService } from 'src/app/session.service';
import { map, tap, debounceTime, catchError } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { of } from 'rxjs';
import { SessionI } from '../session/session-interface';

const DEFAULT_NUMBER_OF_DAYS = 30;

const SESSION_DAYS: Array<Object> = [
  {
    numberOfDays: 30,
    description: "30 Days"
  },
  {
    numberOfDays: 60,
    description: "60 Days"
  },
];

const SESSION_TYPES: Array<Object> = [
  {
    id: "FA",
    description: "First Appearance"
  },
  {
    id: "trial",
    description: "Trial"
  },
];

@Component({
  selector: 'app-upcoming-sessions',
  templateUrl: './upcoming-sessions.component.html',
  styleUrls: ['./upcoming-sessions.component.css']
})
export class UpcomingSessionsComponent implements OnInit {

  sessions: Array<SessionI> = [];

  sessions$;

  sessionDaysFilter = new FormControl('');

  sessionTypeFilter = new FormControl('');

  loading = false;

  sessionDays = SESSION_DAYS;

  sessionTypes = SESSION_TYPES;

  /*
  Paging Parameters
  page  = 2;

  pageSize  = 10;

  collectionSize  = 35;
  */

  constructor(protected sessionService: SessionService) { }

  ngOnInit() {
    this.getUpcomingSessions(DEFAULT_NUMBER_OF_DAYS, "");

    this.sessionDaysFilter.valueChanges.pipe(
      tap(val => {
        this.loading = true;
      }),
      debounceTime(600),
      map(numberOfDays => this.getUpcomingSessions(numberOfDays, this.sessionTypeFilter.value)),
      catchError(() => {
        return of([]);
      }),
      tap(val => {
        this.loading = false;
      })
    ).subscribe();


    this.sessionTypeFilter.valueChanges.pipe(
      tap(val => {
        this.loading = true;
      }),
      debounceTime(600),
      map(sessionType => this.getUpcomingSessions(this.sessionDaysFilter.value, sessionType)),
      catchError(() => {
        return of([]);
      }),
      tap(val => {
        this.loading = false;
      })
    ).subscribe();
  }

  getUpcomingSessions(numberOfDays: number, sessionType: string) {
    this.sessions$ = this.sessionService.getUpcomingSessions().pipe(
      map(sessions => {
        return sessions.sessions;
      }
      ));
  }

}
