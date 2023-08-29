import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent {
  closeResult: string = '';

  contactForm: FormGroup;

  constructor(private modalService: NgbModal, private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.email]],
      telphoneNumber: ['', [this.validateTelphoneNumber]],
    });
  }

  showModal(event: any, templateRef: any) {
    this.modalService
      .open(templateRef, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
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
        invalidFormat: true
      }
    }
  }

  error: string ='';

  customValidation() {
    if(!this.emailControl && !this.teleponeNumberControl) {
      return false;
    }
    else {
      if(this.nameControl?.valid && this.emailControl?.valid || this.teleponeNumberControl?.valid) {
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
