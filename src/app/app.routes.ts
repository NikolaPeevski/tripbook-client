import { NgModule } from '@angular/core';
import { Routes }  from '@angular/router';


export const ROUTES: Routes = [
    {
      path: ``,
      redirectTo: `home`,
      pathMatch: 'full'
    },
    {
      path: `login`,
      loadChildren: './login#LoginModule',
    },
    {
      path: 'home',
      loadChildren: './home#HomeModule'
    },
    {
      path: 'search',
      loadChildren: './search#SearchModule'
    }
]
