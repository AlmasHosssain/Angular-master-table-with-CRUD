import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { User } from './../model/User';

@Injectable({
  providedIn: 'root'
})
export class UserListService {

  constructor() { }

  addUser(user : User) : Observable<User[]> {
    let userArray = [];
    if (localStorage.getItem('Users')) {
      userArray = JSON.parse(localStorage.getItem('Users'))
      userArray = [user, ...userArray]
    } else {
      userArray.unshift(user)
    }

    localStorage.setItem('Users', JSON.stringify(userArray))
    
    return of(
      userArray
    )
  }

  updateUser(user : User): Observable<User[]> {
    const userArray : [] = JSON.parse(localStorage.getItem('Users'));
    userArray.forEach((singleUser: User) => {
      if (singleUser.id == user.id) {
        singleUser.age = user.age;
        singleUser.name = user.name;
        singleUser.result = user.result;
        singleUser.year = user.year;
        singleUser.dept = user.dept
      } else {
        singleUser
      }
    })
    localStorage.setItem('Users', JSON.stringify(userArray));
    return of(JSON.parse(localStorage.getItem('Users')))
  }

  getAllUser(): Observable<User[]>{
    return of(JSON.parse(localStorage.getItem('Users')))
  }

  getSingleUser() : Observable<User>{
    return of()
  }

  deleteUser(user : User): Observable<User[]>{
    const userArray = JSON.parse(localStorage.getItem('Users'));
    let newUserArray= userArray.filter((singleUser : User)=>{
      return singleUser.id != user.id
    })
    localStorage.setItem('Users', JSON.stringify(newUserArray))
    return of(JSON.parse(localStorage.getItem('Users')));
  }
}
