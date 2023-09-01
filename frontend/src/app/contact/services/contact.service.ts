import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { User, UserForm } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private baseUrl = 'http://localhost:3000';
  private contactSubject = new BehaviorSubject<User[]>([]);
  contacts$ = this.contactSubject.asObservable();

  constructor(private http: HttpClient) {}

  fetchContacts() {
    this.http.get<User[]>(`${this.baseUrl}/api/contacts`).subscribe((data) => {
      this.contactSubject.next(data);
    });
  }

  getContacts(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/api/contacts`);
  }

  addContact(newContact: UserForm): Observable<User> {
    return this.http.post<User>(
      `${this.baseUrl}/api/contact`,
      newContact
    );
  }

  editContact(id: string, updatedInfo: UserForm): Observable<User> {
    return this.http.put<User>(
      `${this.baseUrl}/api/contacts/${id}`,
      updatedInfo
    );
  }

  updatedContacts(contacts: User[]) {
    this.contactSubject.next(contacts);
  }
}
