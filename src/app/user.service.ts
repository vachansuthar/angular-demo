import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { UserModel } from 'src/Model/UserModel';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUsers(): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(`${environment.BaseUrl}/user`);
  }

  getUser(id): Observable<UserModel> {
    return this.http.get<UserModel>(`${environment.BaseUrl}/user/${id}`);
  }

  addUsers(userModel:UserModel): Observable<UserModel> {
    return this.http.post<UserModel>(`${environment.BaseUrl}/user`, userModel);
  }

  updateUsers(userModel:UserModel): Observable<UserModel> {
    return this.http.put<UserModel>(`${environment.BaseUrl}/user/${userModel.id}`, userModel);
  }

  deleteUsers(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.BaseUrl}/user/${id}`);
  }

  login(credential: any): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(`${environment.BaseUrl}/user/?UserName=${credential.UserName}&Password=${credential.Password}`);
  }

}
