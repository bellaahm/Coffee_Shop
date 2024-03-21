import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http:HttpClient) { }
  private DB_URL =  "http://localhost:3000/users"
  getAllUsers(){
    return this.http.get(this.DB_URL);
  }
}
