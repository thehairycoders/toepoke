import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WelcomeComponent } from './welcome/welcome.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
    { path: 'welcome', component: WelcomeComponent },
    { path: 'users', component: UsersComponent }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class HomeRoutingModule { }
