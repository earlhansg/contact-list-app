import { Component, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';
import { Owner } from '../models/owner.model';


@Component({
  selector: 'user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent {
  @Input()
  users: User[];

  @Input()
  itemsPerPage: number;

  @Input()
  favorites: string[];

  currentPage: number;


  @Output()
  editContact: EventEmitter<User> = new EventEmitter<User>()

  @Output()
  deleteContact: EventEmitter<string> = new EventEmitter<string>()

  selectedUser(user: User) {
    this.editContact.emit(user);
  }

  removeUser(id: string) {
    this.deleteContact.emit(id);
  }

  isFavorite(userId: string): boolean {
    return !!this.favorites.find(favoriteId => userId === favoriteId);
  }

}
