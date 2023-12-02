import { Injectable } from '@angular/core';

const TOKEN = "I_token";
const USERID = "I_user";
const USERROLE = "I_role";

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  saveUser(user: any) {
    window.localStorage.removeItem(USERID);
    window.localStorage.setItem(USERID, JSON.stringify(user));
  }

  saveUserId(userId:any, role: string){
    const user = { userId, role };
    this.saveUser(user);
  }

  saveUserRole(role: any) {
    window.localStorage.removeItem(USERROLE);
    window.localStorage.setItem(USERROLE, role);
  }

  saveToken(token: any) {
    window.localStorage.removeItem(TOKEN);
    window.localStorage.setItem(TOKEN, token);
  }

  static getToken(): string | null {
    return localStorage.getItem(TOKEN);
  }

  static hasToken():boolean {
    if(this.getToken() === null) {
      return false;
    }
    return true;
  }

  static isUserLoggedIn(): boolean {
    if (this.getToken() === null) {
      return false;
    }
    const role: string = this.getUserRole();
    return role == "USER"
  }

  static getUserRole(): string {
    const user = this.getUser();
    if(user == null) {
      return '';
    }
    return user.role;
  }

  static getUser(): any | null {
    const userString = localStorage.getItem(USERID);
    if (userString === null) {
      return null;
    }
    return JSON.parse(userString);
  }

  static isAdminLoggedIn(): boolean {
    if (this.getToken() === null) {
      return false;
    }
    const role: string = this.getUserRole();
    return role == "ADMIN"
  }

  static signOut() {
    window.localStorage.removeItem(TOKEN);
    window.localStorage.removeItem(USERID);
    window.localStorage.removeItem(USERROLE);
  }

}
