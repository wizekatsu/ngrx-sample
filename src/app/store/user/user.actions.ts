import { createAction, props } from '@ngrx/store';
import { User } from './user.state';

/** ユーザー一覧取得のaction */
export const loadUsers = createAction('[User] Load Users');
export const loadUsersSuccess = createAction('[User] Load Users Success', props<{ users: User[] }>());
export const loadUsersFailure = createAction('[User] Load Users Failure', props<{ error: string }>());

/** ユーザー詳細取得のaction */
export const selectUser = createAction('[User] Select User', props<{ userId: number }>());
export const selectUserSuccess = createAction('[User] Select User Success', props<{ user: User }>());
export const selectUserFailure = createAction('[User] Select User Failure', props<{ error: string }>());

/** ユーザー編集のaction */
export const editUser = createAction('[User] Edit User', props<{ user: User }>());
export const editUserSuccess = createAction('[User] Edit User Success', props<{ user: User }>());
export const editUserFailure = createAction('[User] Edit User Failure', props<{ error: string }>());

/** ユーザー削除のaction */
export const deleteUser = createAction('[User] Delete User', props<{ userId: number }>());
export const deleteUserSuccess = createAction('[User] Delete User Success');
export const deleteUserFailure = createAction('[User] Delete User Failure', props<{ error: string }>());

/** ユーザー新規作成のaction */
export const createUser = createAction('[User] Create User', props<{ user: User }>());
export const createUserSuccess = createAction('[User] Create User Success', props<{ user: User }>());
export const createUserFailure = createAction('[User] Create User Failure', props<{ error: string }>());
