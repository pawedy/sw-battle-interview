import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ApiResourceType } from '../../enums';
import { Api, ApiEntry, ApiList } from '../../models';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService implements Api {
  private http = inject(HttpClient);

  getItems(
    resource: ApiResourceType,
    page?: number,
    limit?: number
  ): Observable<ApiList> {
    let params = new HttpParams();
    if (page) {
      params = params.append('page', page);
    }
    if (limit !== undefined) {
      params = params.append('limit', limit);
    }

    return this.http.get<ApiList>(`${environment.apiBaseUrl}/${resource}`, {
      params,
    });
  }

  getItem(resource: ApiResourceType, id: string): Observable<ApiEntry> {
    return this.http.get<ApiEntry>(
      `${environment.apiBaseUrl}/${resource}/${id}`
    );
  }
}
