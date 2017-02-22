import { AddSquadComponent } from './add-squad/add-squad.component';
import { RouterModule } from '@angular/router';

export const SquadsRouting = RouterModule.forChild([
  { path: 'add', component: AddSquadComponent }
]);
