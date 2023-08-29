import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ContactComponent } from './contact/contact.component';
import { HeaderComponent } from './contact/header/header.component';
import { FilterComponent } from './contact/filter/filter.component';
import { UserListComponent } from './contact/user-list/user-list.component';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { UserModalComponent } from './contact/user-modal/user-modal.component';


@NgModule({
  declarations: [
    AppComponent,
    ContactComponent,
    HeaderComponent,
    FilterComponent,
    UserListComponent,
    UserModalComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    NgSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
