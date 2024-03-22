import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { Contact, addressTypeValues, phoneTypeValues } from '../contacts/contact.model';
import { ContactsService } from '../contacts/contacts.service';
import { Subscription } from 'rxjs';
import { RestrictedWordValidator } from '../validators/restricted-words-validator-directive';
import { DateValueAccessorDirective } from '../date-value-accessor/date-value-accessor.directive';
import { ProfileIconSelectorComponent } from '../profile-icon-selector/profile-icon-selector.component';

@Component({
  imports: [CommonModule, FormsModule, RestrictedWordValidator, DateValueAccessorDirective, ProfileIconSelectorComponent],
  standalone: true,
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css']
})
export class EditContactComponent implements OnInit, OnDestroy {
  contact: Contact = {
    id: '',
    icon: '',
    personal: false,
    firstName: '',
    lastName: '',
    dateOfBirth: null,
    favoritesRanking: 0,
    phones: [
      {
        phoneNumber: '',
        phoneType: '',
      }
    ],
    address: {
      streetAddress: '',
      city: '',
      state: '',
      postalCode: '',
      addressType: '',
    },
    notes: ''
  };
  phoneTypes = phoneTypeValues;
  addressTypes = addressTypeValues;
  contactSub!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private contactsService: ContactsService,
    private router: Router
  ) { }

  ngOnInit() {
    const contactId = this.route.snapshot.params['id'];
    if (!contactId) return

    this.contactSub = this.contactsService.getContact(contactId).subscribe(contact => {
      if (contact)
        this.contact = contact;
    });
  }

  ngOnDestroy(): void {
    this.contactSub.unsubscribe();
  }

  saveContact(form: NgForm) {
    console.log(form.value);
    console.log(this.contact.personal, typeof this.contact.personal);

    this.contactsService.saveContact(this.contact).subscribe({
      next: () => this.router.navigate(['/contacts'])
    });
  }

  addPhone(){
    this.contact.phones.push({
      phoneNumber: '',
      phoneType: '',
    });
  }
}
