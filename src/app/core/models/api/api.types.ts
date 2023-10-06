import { Observable } from 'rxjs';
import { ApiResourceType } from '../../enums';
import { StarshipsProperties } from './starships.types';
import { PeopleProperties } from './people.types';

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
  name: string;
  created: string;
  edited: string;
  url: string;
}

export type Resource = StarshipsProperties | PeopleProperties;

export interface Api<EntryProperties> {
  getItems(
    resource: ApiResourceType,
    page?: number,
    limit?: number
  ): Observable<ApiList>;
  getItem(
    resource: ApiResourceType,
    id: string
  ): Observable<ApiEntry<EntryProperties>>;
}
