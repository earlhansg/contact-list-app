import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { firstValueFrom } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private baseUrl = 'http://localhost:3000';
  private contactSubject = new Subject<any>();
  contacts$ = this.contactSubject.asObservable();

  constructor(private http: HttpClient) {
    http.get(`${this.baseUrl}/api/contact`).subscribe(res => this.contactSubject.next(res))
  }

  // Example: Fetch contact from the backend API
  // fetchData() {
  //   return this.http.get(`${this.baseUrl}/api/contacts`);
  // }

  // Example: Send contact to the backend API
  // sendData(data: any) {
  //   return this.http.post(`${this.baseUrl}/api/data`, data);
  // }
  async addContact(newData: any) {
    try {
      const response = await firstValueFrom(
        this.http.post(`${this.baseUrl}/api/contact`, newData)
      );
      this.contactSubject.next(newData);
    } catch (error) {
      console.error(error);
    }
  }
}