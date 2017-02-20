import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent {

  @Input() loggedIn: boolean;
  @Output() logoutEvent: EventEmitter<void> = new EventEmitter<void>();

  constructor() { }

  logout(): void {

    this.logoutEvent.next();

  }

}
