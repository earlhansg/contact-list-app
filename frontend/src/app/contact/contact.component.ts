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
  unfilteredContacts: User[];

  searchTerm: string = '';

  constructor(
    private modalService: NgbModal,
    private contactService: ContactService
  ) {}

  ngOnInit(): void {
    this.contactService.contacts$.subscribe((data) => {
      this.contacts = data;
      this.unfilteredContacts = data;
    });
    this.contactService.fetchContacts();
  }

  showModal(user?: User) {
    const modalRef = this.modalService.open(UserModalComponent);
    if (user) {
      modalRef.componentInstance.currentUser = user;
    }
  }

  onEditContact(user: User) {
    this.showModal(user);
  }

  onDeleteContact(id: string) {
    this.contactService.deleteContact(id).subscribe({
      next: (res) => {
        if (res) {
          this.contacts = this.contacts.filter((contact) => contact._id !== id);
          this.contactService.updatedContacts(this.contacts);
          this.contactService.fetchContacts();
          this.searchTerm = '';
        }
      },
      error: (error) => {
        console.error('Error deleting contact:', error); // Handle errors here
      },
    });
  }

  onFilterByName(name: any | string) {
    this.searchTerm = name;
    if (name === '') {
      this.contacts = this.unfilteredContacts;
    } else {
      const filteredContacts = this.unfilteredContacts.filter(
        (contact) => contact.name === name
      );
      this.contacts = filteredContacts.length ? filteredContacts : [];
    }
  }
}
