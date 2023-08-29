import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  @Output()
  addContact: EventEmitter<boolean> =  new EventEmitter<boolean>(false);

  onAddContact() {
    this.addContact.emit(true);
  }
}
