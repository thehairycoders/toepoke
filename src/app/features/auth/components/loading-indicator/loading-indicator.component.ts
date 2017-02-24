import { Component, Input } from '@angular/core';


@Component({
    selector: 'app-loading-indicator',
    template: `    
    <md-progress-spinner *ngIf="loading" mode="indeterminate" class="loading-indicator"></md-progress-spinner>
  `,
    styles: [`
    .loading-indicator {
        position: fixed;
        z-index: 999;
        overflow: show;
        margin: auto;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;  
    }

        .loading-indicator:before {
        content: '';
        display: block;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(255, 255, 255, 0.5);
    }
  `]

})
export class LoadingIndicatorComponent {
    @Input() loading = false;
}