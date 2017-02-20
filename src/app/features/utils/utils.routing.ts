import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RouterModule } from '@angular/router';

export const UtilsRouting = RouterModule.forChild([
  { path: 'page-not-found', component: PageNotFoundComponent }
]);
