import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ApiService } from './api.service';
import { ApiResource } from '../../enums';
import { environment } from '../../../../environments/environment';
import { peopleMockItems, peopleMockList } from '../../../../test-mocks';
import { ApiEntry, ApiList, PeopleProperties } from '../../models';

describe('ApiService', () => {
  let service: ApiService<any>;
  let httpController: HttpTestingController;
  const apiBaseUrl = environment.apiBaseUrl;
  let apiResource: ApiResource;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });

    service = TestBed.inject(ApiService);
    apiResource = ApiResource.PEOPLE;
    httpController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch people from the API', () => {
    const mockItems: ApiList = peopleMockList;

    service.getItems(apiResource).subscribe((items) => {
      expect(items).toEqual(mockItems);
    });

    const req = httpController.expectOne({
      method: 'GET',
      url: `${apiBaseUrl}/${apiResource}`,
    });

    expect(req.request.method).toEqual('GET');
    req.flush(mockItems);
  });

  it('should fetch proplr by id from the API', () => {
    const mockItem: ApiEntry<PeopleProperties> = peopleMockItems[1];

    service.getItem(apiResource, '1').subscribe((item) => {
      expect(item).toEqual(mockItem);
    });

    const req = httpController.expectOne({
      method: 'GET',
      url: `${apiBaseUrl}/${apiResource}/1`,
    });

    expect(req.request.method).toEqual('GET');
    req.flush(mockItem);
  });
});
