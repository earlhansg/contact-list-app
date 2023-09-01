import { Component, OnInit  } from '@angular/core';

import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ContactService } from '../services/contact.service';
import { User, UserForm } from '../models/user.model';
import { of, switchMap } from 'rxjs';

@Component({
  selector: 'user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.css'],
})
export class UserModalComponent implements OnInit {
  closeResult: string = '';

  contactForm: FormGroup;

  contacts: User[];

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
  ) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.email]],
      telephoneNumber: [
        '',
        [Validators.minLength(6), this.telephoneNumberValidator],
      ],
      favoriteFlag: '',
    });
  }

  ngOnInit(): void {
    console.log('changes', this.closeResult);
    this.contactService.contacts$.subscribe((data) => {
      this.contacts = data;
    });
  }

  closeModal() {
    this.modalService.dismissAll();
  }

  get nameControl() {
    return this.contactForm.get('name');
  }

  get emailControl() {
    return this.contactForm.get('email');
  }

  get telephoneNumberControl() {
    return this.contactForm.get('telephoneNumber');
  }

  telephoneNumberValidator(control: AbstractControl) {
    const regexPattern = /^[0-9+]+$/;
    if (regexPattern.test(control.value)) {
      console.log('Valid input: ' + control.value);
      return null;
    } else {
      console.log('Invalid input: ' + control.value);
      return {
        invalidFormat: true,
      };
    }
  }

  error: string = '';

  customValidation() {
    if (!this.emailControl && !this.telephoneNumberControl) {
      return false;
    }
    if (
      this.nameControl?.valid &&
      ((this.emailControl?.value !== '' && this.emailControl?.valid) ||
        this.telephoneNumberControl?.valid)
    ) {
      return true;
    }
    return false;
  }

  onSubmit() {
    // Submit the form and handle the response using RxJS operators
    this.contactService
      .addContact(this.contactForm.value)
      .pipe(
        switchMap((res) => {
          if (res.contact) {
            // If the response contains a contact, update the contacts list
            this.contacts.push(res.contact);
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
