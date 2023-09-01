import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserModalComponent } from './user-modal/user-modal.component';
import { ContactService } from './services/contact.service';
import { User } from './models/user.model';

@Component({
  selector: 'contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent implements OnInit {
  contacts: User[];

  constructor(
    private modalService: NgbModal,
    private contactService: ContactService
  ) {}

  ngOnInit(): void {
    this.contactService.contacts$.subscribe((data) => {
      this.contacts = data;
    });
    this.contactService.fetchContacts();
  }

  showModal(user?: User) {
    const modalRef = this.modalService.open(UserModalComponent);
    if(user) {
      modalRef.componentInstance.currentUser = user;
    }
  }

  onSelectedUser(user: User) {
    this.showModal(user);
  }
}
