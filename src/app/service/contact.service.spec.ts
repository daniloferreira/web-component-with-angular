import {inject, TestBed} from '@angular/core/testing';

import {ContactService} from './contact.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {HttpClient} from '@angular/common/http';
import {Email} from '../model/email';

describe('ContactService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });

    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
  });
  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', inject([ContactService], (service: ContactService) => {
    expect(service).toBeTruthy();
  }));

  it('should get main email', inject([ContactService], (service: ContactService) => {

    const testData: Email = new Email();
    testData.email = 'email teste';

    service.getMainEmail()
      .subscribe(data =>
        expect(data).toEqual(testData)
      );
    const req = httpTestingController.expectOne('/persons/emails');

    // Assert that the request is a GET.
    expect(req.request.method).toEqual('GET');

    // Respond with mock data, causing Observable to resolve.
    // Subscribe callback asserts that correct data was returned.
    req.flush(testData);

    // Finally, assert that there are no outstanding requests.
    httpTestingController.verify();
  }));

});
