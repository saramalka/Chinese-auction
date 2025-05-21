import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../domain/user';

@Injectable()
export class UserService {

    constructor(private _http: HttpClient) { }
    getUsersDataFromServer(): Observable<User[]> {
        return this._http.get<User[]>("/api/users")
    }

    saveUserToServer(user: User): Observable<boolean> {
        return this._http.post<boolean>("http://localhost:3000/api/users", user)
    }

    deleteUserFromServer(user: User) {
        return this._http.delete("http://localhost:3000/api/users/" + user.id)
    }
    editUserFromServer(user: User) {
        return this._http.put("http://localhost:3000/api/users/" + user.id, user)
    }

    getOneFromServer(id: number): Observable<User> {
        return this._http.get<User>("http://localhost:3000/api/users/" + id)
    }
    post(user: User): Observable<User> {
        return this._http.post<User>("http://localhost:3000/api/users", user)
    }
    updateProduct(user: User) {
        return this._http.put<User>("http://localhost:3000/api/users/" + user.id, user)
    }
}