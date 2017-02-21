import { UsersComponent } from './users/users.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const HomeRoutes: Routes = [
    { path: 'welcome', component: WelcomeComponent },
    { path: 'users', component: UsersComponent }
];
