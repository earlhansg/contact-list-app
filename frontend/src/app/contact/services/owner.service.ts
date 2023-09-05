import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Owner } from '../models/owner.model';

@Injectable({
  providedIn: 'root',
})
export class OwnerService {
  private baseUrl = 'http://localhost:3000';
  private ownerSubject = new BehaviorSubject<Owner>({_id: '', favorites: []});
  owner$ = this.ownerSubject.asObservable();

  constructor(private http: HttpClient) {}

  fetchOwner() {
    const myID = '64f6e20c269c0f939f59b04f'
    this.http.get<Owner>(`${this.baseUrl}/api/owner/${myID}`).subscribe((data) => {
      this.ownerSubject.next(data);
    });
  }

}
