import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ContactComponent } from './contact/contact.component';
import { HeaderComponent } from './contact/header/header.component';
import { FilterComponent } from './contact/filter/filter.component';
import { UserListComponent } from './contact/user-list/user-list.component';

@NgModule({
  declarations: [
    AppComponent,
    ContactComponent,
    HeaderComponent,
    FilterComponent,
    UserListComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
