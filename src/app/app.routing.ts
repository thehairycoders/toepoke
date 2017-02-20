import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/auth-guard';

const appRoutes: Routes = [
    { path: '', redirectTo: '/users', pathMatch: 'full'},
    {
        path: '',
        canActivate: [AuthGuard],
        loadChildren: 'app/features/home/home.module#HomeModule',
    },  
    {
        path: '',
        loadChildren: 'app/features/auth/auth.module#AuthModule',
    },
    {
        path: '',
        loadChildren: 'app/features/utils/utils.module#UtilsModule',
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