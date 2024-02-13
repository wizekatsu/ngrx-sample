import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngrx/store';

import { routes } from './app.routes';
import { userReducer } from './store/user/user.reducer';
import { provideEffects } from '@ngrx/effects';
import { UserEffects } from './store/user/user.effects'
import { provideHttpClient } from '@angular/common/http';
import { userFeatureName } from './store/user/user.selectors';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),provideHttpClient(), provideStore({ [userFeatureName]: userReducer }),provideEffects([UserEffects])]
};
