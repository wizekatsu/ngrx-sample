// user.effects.ts

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import * as UserActions from './user.actions';
import { UserService } from './user.service'; 

@Injectable()
export class UserEffects {
    loadUsers$ = createEffect(() => {
        console.log('effectUsers')
        return this.actions$.pipe(
            ofType(UserActions.loadUsers),
            mergeMap(() =>
                this.userService.getUsers().pipe(
                    map(users => UserActions.loadUsersSuccess({ users })),
                    catchError(error => of(UserActions.loadUsersFailure({ error })))
                )
            )
        )
    }
  );

  selectUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.selectUser),
      mergeMap(action =>
        this.userService.getUserById(action.userId).pipe(
          map(user => UserActions.selectUserSuccess({ user })),
          catchError(error => of(UserActions.selectUserFailure({ error })))
        )
      )
    )
  );

  editUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.editUser),
      mergeMap(action =>
        this.userService.editUser(action.user).pipe(
          map((user) => UserActions.editUserSuccess({ user })),
          catchError(error => of(UserActions.editUserFailure({ error })))
        )
      )
    )
  );

  deleteUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.deleteUser),
      mergeMap(action =>
        this.userService.deleteUser(action.userId).pipe(
          map(() => UserActions.deleteUserSuccess()),
          catchError(error => of(UserActions.deleteUserFailure({ error })))
        ),
        UserActions.loadUsers
      )
    )
  );

  createUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.createUser),
      mergeMap(action =>
        this.userService.createUser(action.user).pipe(
          map(user => UserActions.createUserSuccess({ user })),
          catchError(error => of(UserActions.createUserFailure({ error })))
        )
      )
    )
  );

  constructor(private actions$: Actions, private userService: UserService) {}
}
