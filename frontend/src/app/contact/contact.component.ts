import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserModalComponent } from './user-modal/user-modal.component';

@Component({
  selector: 'contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent {

  constructor(private modalService: NgbModal) {}

  showModal(event: any) {
    const modalRef = this.modalService.open(UserModalComponent);
  }
}
