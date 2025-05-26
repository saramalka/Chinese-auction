import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../domain/user';

@Injectable()
export class UserService {

    constructor(private _http: HttpClient) { }
    userUrl:string='/api/Users'
    getUsersDataFromServer(): Observable<User[]> {
        return this._http.get<User[]>(this.userUrl)
    }
    deleteUserFromServer(id: number) {
        return this._http.delete(this.userUrl + id)
    }
    getOneFromServer(id: number): Observable<User> {
        return this._http.get<User>(this.userUrl + id)
    }
    register(user: User): Observable<User> {
        return this._http.post<User>(`${this.userUrl}/register`, user)
    }
    login(user:User): Observable<User> {
        return this._http.post<User>(`${this.userUrl}/login`, user)
    }
    updateUser(id:number,user: User) {
        return this._http.put<User>(this.userUrl + id, user)
    }
}