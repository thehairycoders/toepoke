import { HomeRoutes } from './features/home/home.routing';
import { AuthGuard } from './services/auth-guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full'},
    {
        path: '',
        canActivate: [AuthGuard],
        children: [...HomeRoutes]
    },  
    {
        path: 'squads',
        canActivate: [AuthGuard],
        loadChildren: './features/squads/squads.module#SquadsModule',
    },
    {
        path: '',
        loadChildren: './features/auth/auth.module#AuthModule',
    },
    {
        path: '',
        loadChildren: './features/utils/utils.module#UtilsModule',
    },
    { path: '**', redirectTo: '/page-not-found', pathMatch: 'full' }
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes, { useHash: true })
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }
