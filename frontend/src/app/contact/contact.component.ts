import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserModalComponent } from './user-modal/user-modal.component';
import { ContactService } from './services/contact.service';
import { OwnerService } from './services/owner.service';
import { User } from './models/user.model';
import { Owner } from './models/owner.model';

@Component({
  selector: 'contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent implements OnInit {
  contacts: User[];
  unfilteredContacts: User[];

  owner: Owner;

  perPage = 5;

  isFilteredByFavorite = false;
  filteredContactsByFavorite: User[];

  searchTerm: string = '';

  constructor(
    private modalService: NgbModal,
    private contactService: ContactService,
    private ownerService: OwnerService
  ) {}

  ngOnInit(): void {
    this.contactService.contacts$.subscribe((data) => {
      this.contacts = data;
      this.unfilteredContacts = data;
    });
    this.ownerService.owner$.subscribe((data) => {
      this.owner = data;
    });
    this.contactService.fetchContacts();
    this.ownerService.fetchOwner();
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
      this.contacts = this.isFilteredByFavorite
        ? this.filteredContactsByFavorite
        : this.unfilteredContacts;
    } else {
      this.contacts = this.isFilteredByFavorite
        ? this.filteredContactsByFavorite.filter(
            (contact) => contact.name === name
          )
        : this.unfilteredContacts.filter((contact) => contact.name === name);
    }
  }

  onShowPage(value: number) {
    this.perPage = value;
  }

  onFilterByFavorite(value: boolean) {
    this.isFilteredByFavorite = value;
    if (value) {
      this.contacts = this.unfilteredContacts.filter(({ _id }) =>
        this.owner.favorites.includes(_id)
      );
      this.filteredContactsByFavorite = this.contacts;
    } else this.contacts = this.unfilteredContacts;
  }

  onUpdateFavorites(favorite: string) {
    console.log('onUpdateFavorites', favorite);
    this.ownerService
      .updateFavorites(favorite)
      .subscribe((data) => this.ownerService.updatedOwner(data));
  }
}
