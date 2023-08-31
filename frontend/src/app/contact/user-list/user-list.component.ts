import { Component, Input } from '@angular/core';
import { User } from '../models/user.model';


@Component({
  selector: 'user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent {
  @Input()
  users: User[] = []
}
