import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ContactService } from '../services/contact.service';
import { User } from '../models/user.model';
import { of, switchMap } from 'rxjs';
import { FormValidator } from '../utility/validators/form.validator';

@Component({
  selector: 'user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.css'],
})
export class UserModalComponent implements OnInit {
  contactForm: FormGroup;

  contacts: User[];

  currentUser: User;

  formValidator: FormValidator;

  flags = [
    { id: 1, name: 'USA' },
    { id: 2, name: 'PH' },
    { id: 3, name: 'CHINA' },
    { id: 4, name: 'JAPAN' },
  ];

  constructor(
    private modalService: NgbModal,
    private fb: FormBuilder,
    private contactService: ContactService
  ) {}

  ngOnInit(): void {
    this.contactService.contacts$.subscribe((data) => {
      this.contacts = data;
    });
    this.initializeContactForm();
  }

  closeModal() {
    this.modalService.dismissAll();
  }

  initializeContactForm() {
    this.contactForm = this.fb.group({
      name: [
        this.currentUser?.name || '',
        [Validators.required, Validators.minLength(3)],
        [FormValidator.nameAsyncValidator(this.contactService, !!this.currentUser)],
      ],
      email: [this.currentUser?.email || '', [Validators.email]],
      telephoneNumber: [
        this.currentUser?.telephoneNumber || '',
        [Validators.minLength(6), FormValidator.telephoneNumberValidator],
      ],
      favoriteFlag: this.currentUser?.favoriteFlag || '',
    });

    this.formValidator = new FormValidator(this.contactForm);
  }

  onSubmit() {
    this.contactService
      .addContact(this.contactForm.value)
      .pipe(
        switchMap((addedContact) => {
          if (addedContact) {
            this.contacts.push(addedContact);
            this.contactService.updatedContacts(this.contacts);
            this.contactForm.reset();
            this.closeModal();
          }
          // Return an empty observable to avoid emitting a value
          return of(undefined);
        })
      )
      .subscribe();
  }

  updateContact() {
    this.contactService
      .editContact(this.currentUser._id, this.contactForm.value)
      .pipe(
        switchMap((updatedContact) => {
          if (updatedContact) {
            this.contacts.map((contact) => {
              if (contact._id === this.currentUser._id) {
                Object.assign(contact, updatedContact);
              }
            });

            this.contactService.updatedContacts(this.contacts);
            this.contactForm.reset();
            this.closeModal();
          }
          // Return an empty observable to avoid emitting a value
          return of(undefined);
        })
      )
      .subscribe();
  }
}
