// user.selectors.ts

import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from './user.state';

export const userFeatureName='users'

// Feature Selector
export const selectUserState = createFeatureSelector<UserState>(userFeatureName);

// Selectors
export const selectUsers = createSelector(
  selectUserState,
  (state) => state.users
);

export const selectSelectedUser = createSelector(
  selectUserState,
  (state) => state.selectedUser
);

export const selectError = createSelector(
  selectUserState,
  (state) => state.error
);
