import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
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
  users$ =  this.store.select(selectUsers);
  selectedUser$=this.store.select(selectSelectedUser);
  error$=this.store.select(selectError);
  newUser: Omit<User,'id'> = {  name: '', email: '' };
  editUserForm={id:0,name:'',email:''}

  constructor(private store: Store<UserState>) {}

  ngOnInit() {
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

  createUser(user: Omit<User,'id'>) {
    this.store.dispatch(UserActions.createUser({ user }));
    // フォームをリセット
    this.newUser = {name: '', email: '' };
  }

  private setUpdateUserForm(user: User | null): void{
    if(!user)return
    this.editUserForm={...user}
  }
}
