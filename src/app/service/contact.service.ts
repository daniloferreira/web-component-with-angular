import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Person} from '../model/person';
import {Emails} from '../model/emails';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private httpClient: HttpClient) { }

  public getEmails(person: Person): Observable<Emails[]> {
    return this.httpClient.get<Emails[]>(`/persons/${person.id}/emails`);
  }
}
