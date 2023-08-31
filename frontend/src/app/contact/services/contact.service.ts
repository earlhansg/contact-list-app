import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MyService {
  private baseUrl = 'http://localhost:3000'; // Replace with your backend API URL

  constructor(private http: HttpClient) {}

  // Example: Fetch data from the backend API
  fetchData() {
    return this.http.get(`${this.baseUrl}/api/data`);
  }

  // Example: Send data to the backend API
  sendData(data: any) {
    return this.http.post(`${this.baseUrl}/api/data`, data);
  }
}