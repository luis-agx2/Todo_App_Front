import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { RoleResponse } from '../../interfaces/role.interface';

@Injectable({
  providedIn: 'root'
})
export class RolesService {
  base = `${environment.api}/${environment.roles.baseUrl}`;
  constructor(private http: HttpClient) {}

  getRolesCat(): Observable<RoleResponse[]> {
    const url = this.base;

    return this.http.get<RoleResponse[]>(url);
  }
}
