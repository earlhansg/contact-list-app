import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Owner } from '../models/owner.model';

@Injectable({
  providedIn: 'root',
})
export class OwnerService {
  myId = '64f6e20c269c0f939f59b04f';
  private baseUrl = 'http://localhost:3000';
  private ownerSubject = new BehaviorSubject<Owner>({ _id: '', favorites: [] });
  owner$ = this.ownerSubject.asObservable();

  constructor(private http: HttpClient) {}

  fetchOwner() {
    this.http
      .get<Owner>(`${this.baseUrl}/api/owner/${this.myId}`)
      .subscribe((data) => {
        this.ownerSubject.next(data);
      });
  }

  updateFavorites(favorite: string): Observable<Owner> {
    return this.http.put<Owner>(`${this.baseUrl}/api/owner/${this.myId}`, {
      favorite,
    });
  }

  updatedOwner(updated: Owner) {
    this.ownerSubject.next(updated);
  }
}
