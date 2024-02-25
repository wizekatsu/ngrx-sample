import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngrx/store';

import { routes } from './app.routes';
import { userReducer } from './store/user/user.reducer';
import { provideEffects } from '@ngrx/effects';
import { UserEffects } from './store/user/user.effects'
import { provideHttpClient } from '@angular/common/http';
import { userFeatureName } from './store/user/user.selectors';
import { provideStoreDevtools } from '@ngrx/store-devtools';


export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),provideHttpClient(), provideStore({ [userFeatureName]: userReducer }),provideEffects([UserEffects]),    provideStoreDevtools({
    maxAge: 25, // Retains last 25 states
    logOnly:true, // Restrict extension to log-only mode
    autoPause: true, // Pauses recording actions and state changes when the extension window is not open
    trace: false, //  If set to true, will include stack trace for every dispatched action, so you can see it in trace tab jumping directly to that part of code
    traceLimit: 75, // maximum stack trace frames to be stored (in case trace option was provided as true)
  }),]
};
