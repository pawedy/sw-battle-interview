import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ApiService } from './api.service';
import { ApiResourceType } from '../../enums';
import { environment } from '../../../../environments/environment';
import { peopleMockItems, peopleMockList } from '../../../../test-mocks';
import { ApiEntry, ApiList } from '../../models';

describe('ApiService', () => {
  let service: ApiService;
  let httpController: HttpTestingController;
  const apiBaseUrl = environment.apiBaseUrl;
  let apiResource: ApiResourceType;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });

    service = TestBed.inject(ApiService);
    apiResource = ApiResourceType.PEOPLE;
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
    const mockItem: ApiEntry = peopleMockItems[1];

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
