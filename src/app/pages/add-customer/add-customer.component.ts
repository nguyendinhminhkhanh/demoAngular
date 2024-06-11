import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import moment from 'moment';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrl: './add-customer.component.scss',
})
export class AddCustomerComponent implements OnInit {
  rfContact: any;
  checkNull: any;
  currentTime: string = moment().format('M/D/YYYY hh:mm:ss a');
  public dataCustomer = <any>[];
  constructor(private fb: FormBuilder, private router: Router) {}
  getCustomer() {
    if (typeof window !== 'undefined') {
      this.dataCustomer =
        JSON.parse(localStorage.getItem('customer') as string) || <any>[];
    }
  }



  Ramdom() {
    let id:any;
    let idList = JSON.parse(localStorage.getItem('customer') as string);
    let checkId = idList.find((idSearch: any) => idSearch.id === id);

    do {
      id = Math.floor(Math.random() * 1001);
      checkId = idList.find((idSearch: any) => idSearch.id === id)
    }
    while (checkId);
    return id;
  }

  onAdd() {
    this.checkNull = false;
    this.getCustomer();
    if (this.rfContact.invalid) {
      console.log('Hãy nhập đủ thông tin khách hàng');
      this.checkNull = true;
      return;
    }
    this.dataCustomer.push({
      id: this.Ramdom(),
      customer: this.rfContact.value.customer,
      address: this.rfContact.value.address,
      email: this.rfContact.value.email,
      phone: this.rfContact.value.phone,
      time:this.currentTime,
    });
    localStorage.setItem('customer', JSON.stringify(this.dataCustomer));
    this.router.navigate(['/', 'pages', 'customer']);
  }
  onExit() {
    this.router.navigate(['/', 'pages', 'customer']);
  }
  ngOnInit(): void {
    this.rfContact = this.fb.group({
      id:[''],
      customer: ['', Validators.required],
      address: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      time: [''],
    });
  }
}
