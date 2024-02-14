import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs'

import { CONFIG } from '../../config';

type SignInParams = {
  email: string
  password: string
}
type SignUpParams = {
  email: string
  password: string
}

type UserDataType = {
  id: string
  email: string
  createdAt: string
  updatedAt: string
}

type AuthResponse = {
  token: string
  refreshToken: string
  user: UserDataType
}

const COOKIES_ENUM = {
  accessToken: '@todo_notes_data_898756315_access_token',
  refreshToken: '@todo_notes_data_898756315_refresh_token',
  userData: '@todo_notes_data_898756315_user_data'
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userData: UserDataType | null = null
  private accessToken: string | null = null
  private refreshToken: string | null = null

  constructor(private http: HttpClient) {
    this.accessToken = this.getAccessTokenStorage()
    this.refreshToken = this.getRefreshTokenStorage()
    this.userData = this.getUserDataStorage()
  }

  async signIn(params: SignInParams) {
    const url = `${CONFIG.apiBaseUrl}/auth/sign-in`

    const source$ = this.http.post<AuthResponse>(url, params)
    const result = await lastValueFrom(source$)

    this.setAccessTokenStorage(result.token)
    this.setRefreshTokenStorage(result.refreshToken)
    this.setUserDataStorage(result.user)

    return this.getAuthData()
  }
  async signUp(params: SignUpParams) {
    const url = `${CONFIG.apiBaseUrl}/auth/sign-up`
    
    const source$ = this.http.post<AuthResponse>(url, params)
    const result = await lastValueFrom(source$)
    
    this.setAccessTokenStorage(result.token)
    this.setRefreshTokenStorage(result.refreshToken)
    this.setUserDataStorage(result.user)

    return this.getAuthData()
  }
  async revalidateToken() {
    const url = `${CONFIG.apiBaseUrl}/auth/refresh-token`
    const { refreshToken } = this.getAuthData()

    const source$ = this.http.post<AuthResponse>(url, { refreshToken: refreshToken })
    const result = await lastValueFrom(source$)
    
    this.setAccessTokenStorage(result.token)
    this.setRefreshTokenStorage(result.refreshToken)
    this.setUserDataStorage(result.user)

    return this.getAuthData()
  }
  signOut() {
    this.clearTokens()
  }
  getAuthData() {
    return {
      accessToken: this.accessToken || this.getAccessTokenStorage(),
      refreshToken: this.refreshToken || this.getRefreshTokenStorage(),
      userData: this.userData || this.getUserDataStorage(),
    }
  }

  private getAccessTokenStorage(): string | null {
    return localStorage.getItem(COOKIES_ENUM.accessToken)
  }
  private getRefreshTokenStorage(): string | null {
    return localStorage.getItem(COOKIES_ENUM.refreshToken)
  }
  private getUserDataStorage(): UserDataType | null {
    const data = localStorage.getItem(COOKIES_ENUM.userData)

    if (!data) return null

    return JSON.parse(data)
  }
  private setAccessTokenStorage(token: string) {
    this.accessToken = token
    localStorage.setItem(COOKIES_ENUM.accessToken, token)
  }
  private setRefreshTokenStorage(token: string) {
    this.refreshToken = token
    localStorage.setItem(COOKIES_ENUM.refreshToken, token)
  }
  private setUserDataStorage(data: UserDataType) {
    this.userData = data
    localStorage.setItem(COOKIES_ENUM.userData, JSON.stringify(data))
  }
  private clearTokens() {
    localStorage.removeItem(COOKIES_ENUM.accessToken)
    localStorage.removeItem(COOKIES_ENUM.refreshToken)
    localStorage.removeItem(COOKIES_ENUM.userData)
  }
}
