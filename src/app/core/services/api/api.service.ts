import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ApiResource } from '../../enums';
import { Api, ApiEntry, ApiList } from '../../models';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService<Player> implements Api<Player> {
  private http = inject(HttpClient);

  getItems(
    resource: ApiResource,
    page?: number,
    limit?: number
  ): Observable<ApiList> {
    const params = new HttpParams();
    if (!!page) {
      params.set('page', page);
    }
    if (!!limit) {
      params.set('limit', limit);
    }

    return this.http.get<ApiList>(`${environment.apiBaseUrl}/${resource}`, {
      params,
    });
  }

  getItem(resource: ApiResource, id: string): Observable<ApiEntry<Player>> {
    return this.http.get<ApiEntry<Player>>(
      `${environment.apiBaseUrl}/${resource}/${id}`
    );
  }
}
