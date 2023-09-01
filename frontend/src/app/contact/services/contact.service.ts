import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { AddContactResponse, User, UserForm } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private baseUrl = 'http://localhost:3000';
  private contactSubject = new BehaviorSubject<User[]>([]);
  contacts$ = this.contactSubject.asObservable();

  constructor(private http: HttpClient) {}

  fetchContacts() {
    this.http.get<User[]>(`${this.baseUrl}/api/contact`).subscribe((data) => {
      this.contactSubject.next(data);
    });
  }

  getContacts(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/api/contact`);
  }

  addContact(newContact: UserForm): Observable<AddContactResponse> {
    return this.http.post<AddContactResponse>(
      `${this.baseUrl}/api/contact`,
      newContact
    );
  }

  updatedContacts(contacts: User[]) {
    this.contactSubject.next(contacts);
  }
}
