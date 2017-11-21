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
      path: 'search/:term',
      loadChildren: './search#SearchModule'
    },
    {
      path: 'user/:userId',
      loadChildren: './user#UserModule'
    },
    {
        path: 'locals',
        loadChildren: './locals#LocalsModule'
    },
    {
        path: 'trips',
        loadChildren: './trips#TripsModule'
    },
    {
        path: 'trip/:tripId',
        loadChildren: './trip#TripModule'
    }



]
