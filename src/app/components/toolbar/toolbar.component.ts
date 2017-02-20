import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  @Input() loggedIn: boolean;
  @Output() logoutEvent: EventEmitter<void> = new EventEmitter<void>();

  constructor() { }

  ngOnInit() { }

  logout():void {

    this.logoutEvent.next();

  }

}
