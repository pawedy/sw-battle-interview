import { Observable } from 'rxjs';
import { ApiResource } from '../../enums';

export interface ApiListItem {
  uid: string;
  name: string;
  url: string;
}

export interface ApiList {
  message: string;
  total_records: number;
  total_pages: number;
  next: string | null;
  previous: string | null;
  results: ApiListItem[];
}

export interface ApiEntry<EntryProperties> {
  message: string;
  result: {
    properties: EntryProperties;
    description: string;
    uid: string;
  };
}

export interface GeneralEntryProperties {
  created: string;
  edited: string;
  name: string;
  url: string;
}

export interface Api<EntryProperties> {
  getItems(resource: ApiResource, page?: number): Observable<ApiList>;
  getItem(
    resource: ApiResource,
    id: number
  ): Observable<ApiEntry<EntryProperties>>;
}
