import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { HearingI } from './hearing/hearingI';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  public CC_GET_PENDING_HEARINGS = "searchHearings";

  public CC_GET_HEARING_DETAILS = "getHearingDetails";

  public CC_GET_UPCOMING_SESSIONS = "getSessionsUpcoming";

  sessionsUrl = '../bridgeControl.do';

  constructor(private http: HttpClient) { }

  searchHearings(searchFilter: string, sort: string): any {
    return this.http.get<any>('../assets/pending-list-objects/PendingHearingList.json');
    return this.http.post<HearingI>(this.sessionsUrl, {
      action: this.CC_GET_PENDING_HEARINGS,
      search: searchFilter,
    });
  }

  getHearingDetails(hearingId: number): any {
    return this.http.get<any>('../assets/pending-list-objects/HearingDetails.json');
    return this.http.post<HearingI>(this.sessionsUrl, {
      action: this.CC_GET_HEARING_DETAILS,
      hearingId
    });


  }

  getUpcomingSessions(): Observable<any> {
    return this.http.get<any>('../assets/pending-list-objects/UpcomingSessions.json');
    return this.http.post<HearingI>(this.sessionsUrl, { action: this.CC_GET_UPCOMING_SESSIONS });
  }
}
