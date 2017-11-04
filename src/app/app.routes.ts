import { NgModule } from '@angular/core';
import { Routes }  from '@angular/router';


export const ROUTES: Routes = [
    {
        path: ``,
        redirectTo: `login`,
        pathMatch: 'full'
    },
    {
    path: `login`,
    loadChildren: './login#LoginModule',
    },
]
