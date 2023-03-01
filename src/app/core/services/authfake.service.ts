import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User, ResponseLogin } from '../models/auth.models';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthfakeauthenticationService {
    private currentUserSubject: BehaviorSubject<ResponseLogin>;
    public currentUser: Observable<ResponseLogin>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<ResponseLogin>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): ResponseLogin {
        return this.currentUserSubject.value;
    }

    login(email: string, password: string) {
        return this.http.post<ResponseLogin>(`${environment.apiUrl}/login`, { email, password })
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify( user.data ) );
                    localStorage.setItem('tokenUser', JSON.stringify( user.token ) );
                    this.currentUserSubject.next(user);
                }
                return user;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        localStorage.removeItem('tokenUser');
        this.currentUserSubject.next(null);
    }
}
