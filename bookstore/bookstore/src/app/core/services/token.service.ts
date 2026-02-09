import { Injectable } from '@angular/core';

const TOKEN_KEY = 'obs_token';
const ROLE_KEY = 'obs_role';
const NAME_KEY = 'obs_name';
const EMAIL_KEY = 'obs_email';

@Injectable({ providedIn: 'root' })
export class TokenService {

  // ---------- Token ----------
  setToken(token: string) {
    localStorage.setItem(TOKEN_KEY, token);
  }

  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  // ---------- Role ----------
  setRole(role: string) {
    localStorage.setItem(ROLE_KEY, role);
  }

  getSavedRole(): string | null {
    return localStorage.getItem(ROLE_KEY);
  }

  // ---------- Profile ----------
  setProfile(name?: string, email?: string) {
    if (name) localStorage.setItem(NAME_KEY, name);
    if (email) localStorage.setItem(EMAIL_KEY, email);
  }

  getSavedName(): string | null {
    return localStorage.getItem(NAME_KEY);
  }

  getSavedEmail(): string | null {
    return localStorage.getItem(EMAIL_KEY);
  }

  // ---------- Clear / Logout ----------
  clear(): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(ROLE_KEY);
    localStorage.removeItem(NAME_KEY);
    localStorage.removeItem(EMAIL_KEY);
  }

  // navbar calls this
  logout(): void {
    this.clear();
  }

  // ---------- Auth State ----------
  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  // ---------- JWT decode helpers ----------
  private decodePayload(): any | null {
    const token = this.getToken();
    if (!token) return null;
    try {
      const payload = token.split('.')[1];
      const json = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
      return JSON.parse(decodeURIComponent(escape(json)));
    } catch {
      return null;
    }
  }

  // ---------- Name ----------
  getName(): string | null {
    const saved = this.getSavedName();
    if (saved) return saved;

    const p = this.decodePayload();
    const name = p?.name || p?.fullName || p?.username;
    if (typeof name === 'string' && name.trim()) return name;

    const sub = p?.sub;
    return typeof sub === 'string' ? sub : null;
  }

  // ---------- Email ----------
  getEmail(): string | null {
    const saved = this.getSavedEmail();
    if (saved) return saved;

    const p = this.decodePayload();
    const email = p?.email;
    if (typeof email === 'string' && email.trim()) return email;

    const sub = p?.sub;
    return typeof sub === 'string' ? sub : null;
  }

  // ---------- Role (single source of truth) ----------
  getRole(): string | null {
    // 1) Prefer saved role from signin response
    const savedRole = this.getSavedRole();
    if (typeof savedRole === 'string' && savedRole.trim()) {
      return savedRole.toUpperCase();
    }

    // 2) Fallback: decode from JWT
    const p = this.decodePayload();
    if (!p) return null;

    if (typeof p.role === 'string') return p.role.toUpperCase();

    if (Array.isArray(p.roles) && p.roles.length && typeof p.roles[0] === 'string') {
      return p.roles[0].toUpperCase();
    }

    if (Array.isArray(p.authorities) && p.authorities.length) {
      const a0 = p.authorities[0];
      if (typeof a0 === 'string') return a0.toUpperCase();
      if (a0 && typeof a0.authority === 'string') return a0.authority.toUpperCase();
    }

    return null;
  }

  // ---------- Role checks ----------
  isAdmin(): boolean {
    const r = (this.getRole() || '').toUpperCase().trim();
    return r === 'ADMIN' || r === 'ROLE_ADMIN';
  }

  isUser(): boolean {
    const r = (this.getRole() || '').toUpperCase().trim();
    return r === 'USER' || r === 'ROLE_USER';
  }
}
