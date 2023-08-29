import { Component, OnInit  } from '@angular/core';

import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.css'],
})
export class UserModalComponent implements OnInit {
  closeResult: string = '';

  contactForm: FormGroup;

  flags = [
    { id: 1, name: 'USA' },
    { id: 2, name: 'PH' },
    { id: 3, name: 'CHINA' },
    { id: 4, name: 'JAPAN' },
  ];

  constructor(private modalService: NgbModal, private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.email]],
      telphoneNumber: ['', [this.validateTelphoneNumber]],
      favoriteFlag: '',
    });
  }

  ngOnInit(): void {
     console.log('changes', this.closeResult);
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

  get teleponeNumberControl() {
    return this.contactForm.get('telphoneNumber');
  }

  validateTelphoneNumber(control: AbstractControl) {
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
    if (!this.emailControl && !this.teleponeNumberControl) {
      return false;
    } else {
      if (
        this.nameControl?.valid && (this.emailControl?.valid || this.teleponeNumberControl?.valid)
      ) {
        return true;
      }
    }
    return false;
  }

  onSubmit() {
    console.log('values ... ', this.contactForm.value);
    console.log('email ... ', this.emailControl?.valid);
    // if (this.contactForm.valid) {
    //   console.log('Form submitted:', this.contactForm.value);
    // } else {
    //   console.log('Form is invalid. Please correct the errors.');
    // }
  }
}
