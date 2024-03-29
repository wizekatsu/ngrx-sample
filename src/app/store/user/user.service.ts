// user.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { User } from './user.state';




@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = ''; 
  private id = 11;
  private users=[  { id: 1, name: 'test1', email: 'test1@example.com' },
  { id: 2, name: 'test2', email: 'test2@example.com' },
  { id: 3, name: 'test3', email: 'test3@example.com' },
  { id: 4, name: 'test4', email: 'test4@example.com' },
  { id: 5, name: 'test5', email: 'test5@example.com' },
  { id: 6, name: 'test6', email: 'test6@example.com' },
  { id: 7, name: 'test7', email: 'test7@example.com' },
  { id: 8, name: 'test8', email: 'test8@example.com' },
  { id: 9, name: 'test9', email: 'test9@example.com' },
    { id: 10, name: 'test10', email: 'test10@example.com' }]

  constructor(private http: HttpClient) {}

    getUsers(): Observable<User[]> {
      return of(this.users)
    // return this.http.get<User[]>(this.apiUrl);
  }

    getUserById(userId: number): Observable<User> {
        const user = this.users.find((u) => u.id === userId) 
        if (!user) {
            throw Error('not Found')
        }
        return of(user)
    // const url = `${this.apiUrl}/${userId}`;
    // return this.http.get<User>(url);
  }

  editUser(user: User): Observable<User> {
    this.users =this.users.filter(u => u.id !== user.id)
    this.users.push(user)
    const editUser = this.users.find((u) => u.id === user.id);
    if (!editUser) {
        throw Error('not Found')
    }
    return of(editUser)
    // const url = `${this.apiUrl}/${user.id}`;
    // return this.http.put<User>(url, user);
  }

  deleteUser(userId: number): Observable<void> {
    this.users = this.users.filter(u => u.id !== userId)
    return of(undefined)
    // const url = `${this.apiUrl}/${userId}`;
    // return this.http.delete<void>(url);
  }

  createUser(user: Omit<User, 'id'>): Observable<User> {
    console.log(user)
    const newUser = { id: this.id, ...user }
    this.users = Object.assign([], this.users);
this.users.push(newUser);
    this.id++
    const findUser = this.users.find(u => u.id === this.id - 1) 
    console.log(findUser)
    
    if (!findUser) {
      throw Error('not found user')
    }
    return of(findUser)
    // return this.http.post<User>(this.apiUrl, user);
  }
}
