import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { Contact, addressTypeValues, phoneTypeValues } from '../contacts/contact.model';
import { ContactsService } from '../contacts/contacts.service';
import { Subscription } from 'rxjs';

@Component({
  imports: [CommonModule, FormsModule],
  standalone: true,
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css']
})
export class EditContactComponent implements OnInit, OnDestroy {
  contact: Contact = {
    id: '',
    personal: false,
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    favoritesRanking: 0,
    phone: {
      phoneNumber: '',
      phoneType: '',
    },
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

    this.contactsService.saveContact(form.value).subscribe({
      next: () => this.router.navigate(['/contacts'])
    });
  }
}
