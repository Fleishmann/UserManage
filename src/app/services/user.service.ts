import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = `${environment.apiUrl}/Users`; // URL da API de usuários

  constructor(private http: HttpClient, private authService: AuthService) {}

  getUsers(): Observable<any> {
    const headers = this.authService.getHeaders(); // Obter cabeçalhos com token de autorização
    return this.http.get(this.apiUrl, { headers });
  }

  getUser(id: string): Observable<any> {
    const headers = this.authService.getHeaders(); 
    return this.http.get(`${this.apiUrl}/${id}`, { headers });
  }

  addUser(user: any): Observable<any> {
    const headers = this.authService.getHeaders(); 
    return this.http.post(this.apiUrl, user, { headers });
  }

  updateUser(id: string, user: any): Observable<any> {
    const headers = this.authService.getHeaders(); 
    user.id = id;
    return this.http.put(`${this.apiUrl}/${id}`, user, { headers });
  }

  deleteUser(id: string): Observable<any> {
    const headers = this.authService.getHeaders();
    return this.http.delete(`${this.apiUrl}/${id}`, { headers });
  }
}