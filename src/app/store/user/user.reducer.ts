// user.reducer.ts

import { createReducer, on } from '@ngrx/store';
import * as UserActions from './user.actions';
import { UserState } from './user.state';

export const initialState: UserState = {
  users: [],
  selectedUser: null,
  error: null,
};

export const userReducer = createReducer(
  initialState,
  on(UserActions.loadUsersSuccess, (state, { users }) => ({ ...state, users })),
  on(UserActions.loadUsersFailure, (state, { error }) => ({ ...state, error })),
  on(UserActions.selectUserSuccess, (state, { user }) => ({ ...state, selectedUser: user })),
  on(UserActions.selectUserFailure, (state, { error }) => ({ ...state, error })),
  on(UserActions.editUserSuccess, (state, { user }) => {
    const updatedUsers = state.users.map(u => (u.id === user.id ? user : u));
    return { ...state, users: updatedUsers };
  }),
  on(UserActions.editUserFailure, (state, { error }) => ({ ...state, error })),
  on(UserActions.deleteUserSuccess, (state) => ({ ...state, selectedUser: null })),
  on(UserActions.deleteUserFailure, (state, { error }) => ({ ...state, error })),
  on(UserActions.createUserSuccess, (state, { user }) => ({ ...state, users: [...state.users, user] })),
  on(UserActions.createUserFailure, (state, { error }) => ({ ...state, error }))
);
