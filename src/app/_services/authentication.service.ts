import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    constructor(private http: HttpClient) { }

    login(username: string, password: string) {
        return this.http.post<any>('https://d7ka3nqya8.execute-api.us-east-2.amazonaws.com/dev/login', { username, password })
            .pipe(map(user => {
                if (user && user.usuario['access_token']) {
                    localStorage.setItem('currentUser', user.usuario['access_token']);
                }
                return user;
            }));
    }
    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}