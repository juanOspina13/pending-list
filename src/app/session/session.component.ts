import { Component, OnInit, Input } from '@angular/core';
import { SessionI } from './session-interface';

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.css']
})
export class SessionComponent implements OnInit {
  @Input() session: SessionI;

  constructor() { }

  ngOnInit() {
  }

}
