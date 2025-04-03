import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Profile, ProfileRequest } from '../../interfaces/profile.interface';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = `${environment.api}/${environment.userDetails.baseUrl}`;
  }

  getUserDetails(): Observable<Profile> {
    const url = `${this.baseUrl}/${environment.userDetails.me}`;

    return this.http.get<Profile>(url);
  }

  updateUserDetails(profileRequest: ProfileRequest): Observable<Profile> {
    const url = `${this.baseUrl}/${environment.userDetails.me}`;

    return this.http.put<Profile>(url, profileRequest);
  }
}
