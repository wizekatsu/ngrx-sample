import { Component, OnInit } from '@angular/core';
import { Store ,StoreModule,select} from '@ngrx/store';
import { Observable } from 'rxjs';
import { User, UserState } from './store/user/user.state';
import * as UserActions from './store/user/user.actions';
import { selectUsers, selectSelectedUser, selectError } from './store/user/user.selectors';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports:[CommonModule,FormsModule,],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  users$!: Observable<User[]>;
  selectedUser$!: Observable<User | null>;
  error$!: Observable<string | null>;
  newUser: User = { id: 0, name: '', email: '' };
  editUserForm={id:0,name:'',email:''}

  constructor(private store: Store<UserState>) {}

  ngOnInit() {
    console.log(this.store)
    this.users$ = this.store.select(selectUsers);
    this.selectedUser$ = this.store.select(selectSelectedUser);
    this.error$ = this.store.select(selectError);

    // 初期表示時にユーザーを読み込む
    this.store.dispatch(UserActions.loadUsers());
  }

  editUser(userId: number) {
    this.store.dispatch(UserActions.selectUser({ userId }));
    this.selectedUser$.subscribe(u=>console.log(u))
  }

  updateUser() {
    this.store.dispatch(UserActions.editUser({ user:this.editUserForm }));
    this.selectedUser$.subscribe(u=>this.setUpdateUserForm(u))
  }

  deleteUser(userId: number) {
    this.store.dispatch(UserActions.deleteUser({ userId }));
  }

  createUser(user: User) {
    this.store.dispatch(UserActions.createUser({ user }));
    // フォームをリセット
    this.newUser = { id: 0, name: '', email: '' };
  }

  private setUpdateUserForm(user: User | null): void{
    if(!user)return
    this.editUserForm={...user}
  }
}
