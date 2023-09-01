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

  showModal(event: any) {
    const modalRef = this.modalService.open(UserModalComponent);
  }
}
