import {
  AbstractControl,
  AsyncValidatorFn,
  FormGroup,
  ValidationErrors,
} from '@angular/forms';
import { Observable, catchError, map, of } from 'rxjs';
import { ContactService } from '../../services/contact.service';

export class FormValidator {
  contactForm: FormGroup;
  constructor(form: FormGroup) {
    this.contactForm = form;
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

  static nameAsyncValidator(contactService: ContactService): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      const name = control.value;

      return contactService.getContactByName(name).pipe(
        map((isTaken) => (isTaken ? { nameAlreadyExists: true } : null)),
        catchError(() => of(null))
      );
    };
  }

  static telephoneNumberValidator(control: AbstractControl) {
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
}
