import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../environments/environment';
import { User } from '../interfaces/user';
import { Login } from '../interfaces/login';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private url = environment.apiUrl;

  constructor(private http: HttpClient, private ruta: Router) {}

  login(login: Login) {
    return this.http.post<any>(this.url + 'users/login', login);
  }

  register(register: User) {
    return this.http.post<any>(this.url + 'users/register', register);
  }

  loggedIn() {
    return !!localStorage.getItem('token');
  }

  logOut() {
    localStorage.removeItem('token');
    this.ruta.navigate(['/login']);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  getDecodedToken(): any {
    const token = this.getToken();

    if (!token) {
      return null;
    }

    const decodedToken: any = jwtDecode(token);

    return decodedToken || null;
  }

  changeUsername(newUsername: string) {
    return this.http.put<any>(this.url + 'users/change-username', {
      username: newUsername,
    });
  }

  changeEmail(newEmail: string) {
    return this.http.put<any>(this.url + 'users/change-email', {
      email: newEmail,
    });
  }

  changePassword(
    currentPassword: string,
    newPassword: string,
    newPasswordConfirm: string
  ) {
    const body = {
      currentPassword,
      newPassword,
      newPasswordConfirm,
    };
    return this.http.put<any>(this.url + 'users/change-password', body);
  }

  delete() {
    return this.http.delete<any>(this.url + 'users/delete');
  }
}
