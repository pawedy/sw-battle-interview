import { Observable } from 'rxjs';
import { ApiResourceType } from '../../enums';
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

export interface ApiEntry {
  message: string;
  result: {
    properties: EntryProperties;
    description: string;
    uid: string;
  };
}

export interface SharedEntryProperties {
  name: string;
  created: string;
  edited: string;
  url: string;
}

export interface EntryProperties extends SharedEntryProperties {
  [key: string]: string | number | string[];
}

export interface Api {
  getItems(
    resource: ApiResourceType,
    page?: number,
    limit?: number
  ): Observable<ApiList>;
  getItem(resource: ApiResourceType, id: string): Observable<ApiEntry>;
}
