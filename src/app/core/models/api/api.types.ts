import { Observable } from 'rxjs';

export interface ApiList<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface Api<Item> {
  getItems(page?: number): Observable<ApiList<Item>>;
  getItem(id: number): Observable<Item>;
}
