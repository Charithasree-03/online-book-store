import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environment/environment';
import { JwtAuthenticationResponse, SignInRequest, SignupRequest } from '../../models/auth.model';
import { TokenService } from './token.service';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private base = environment.apiBaseUrl + '/api/auth';

  constructor(private http: HttpClient, private token: TokenService) {}

  signup(payload: SignupRequest): Observable<any> {
    return this.http.post(`${this.base}/signup`, payload);
  }

  signin(payload: SignInRequest) {
  return this.http.post<JwtAuthenticationResponse>(`${this.base}/signin`, payload).pipe(
    tap(res => {
      this.token.setToken(res.token);
      if (res.role) this.token.setRole(res.role); // ✅ add this
      if (res.name) this.token.setProfile(res.name, res.email);
    })
  );
}

  logout() { this.token.clear(); }
}
