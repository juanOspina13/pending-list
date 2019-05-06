import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  sessionsUrl = '../bridgeControl.do';


  constructor(private http: HttpClient) { }
}
