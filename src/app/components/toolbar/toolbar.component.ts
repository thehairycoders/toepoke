import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-toolbar',
    template: `    
      <md-toolbar color="primary">
        Toepoke
        <span class="app-toolbar-filler"></span>
        <a md-icon-button routerLink="/dashboard" mdTooltip="home"><md-icon>home</md-icon></a>
        <button *ngIf="loggedIn" md-icon-button (click)="logoutEvent.next()" mdTooltip="logout">
            <md-icon>exit_to_app</md-icon>
        </button>
      </md-toolbar>
  `,
    styles: [`
      .app-toolbar-filler {
          flex: 1 1 auto;
      }
  `]

})
export class ToolbarComponent {

  @Input() loggedIn = false;
  @Output() logoutEvent: EventEmitter<void> = new EventEmitter<void>();

  constructor() { }

}
