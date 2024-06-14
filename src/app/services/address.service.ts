import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  private apiUrl = `${environment.apiUrl}/address`; // URL da API de usuários

  constructor(private http: HttpClient, private authService: AuthService) {}

  getAddress(id: string): Observable<any> {
    const headers = this.authService.getHeaders(); 
    return this.http.get(`${this.apiUrl}/${id}`, { headers });
  }

  getAddressesByUserId(id: string): Observable<any> {
    const headers = this.authService.getHeaders(); 
    return this.http.get(`${this.apiUrl}/user/${id}`, { headers });
  }

  addAddress(address: any, userId: string): Observable<any> {
    const headers = this.authService.getHeaders(); 
    address.userId = userId;
    return this.http.post(this.apiUrl, address, { headers });
  }

  updateAddress(id: string, userId: string, address: any): Observable<any> {
    const headers = this.authService.getHeaders(); 
    address.id = id;
    address.userId = userId;
    return this.http.put(`${this.apiUrl}/${id}`, address, { headers });
  }

  deleteAddress(id: string): Observable<any> {
    const headers = this.authService.getHeaders();
    return this.http.delete(`${this.apiUrl}/${id}`, { headers });
  }
}