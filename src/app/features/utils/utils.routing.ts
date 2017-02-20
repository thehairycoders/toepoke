import { RouterModule } from '@angular/router';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

export const UtilsRouting = RouterModule.forChild([
  { path: 'page-not-found', component: PageNotFoundComponent }
]);