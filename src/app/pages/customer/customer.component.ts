import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import moment from 'moment';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.scss',
  providers: [NgbModalConfig, NgbModal],
})
export class CustomerComponent implements OnInit {
  rfContact: any;
  rfContactEditSearch: any;
  rfContactSearch: any;
  editElement: any;
  listSearch: any;
  editElementSearch:any;
  inx: any;
  currentTime: string = moment().format('M/D/YYYY hh:mm:ss a');
  public dataCustomer =
    JSON.parse(localStorage.getItem('customer') as string) || <any>[];

  constructor(
    config: NgbModalConfig,
    private modalService: NgbModal,
    private fb: FormBuilder
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  getCustomers() {
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

  openEdit(Edit: any, inx: any) {
    // console.log(inx);
    this.modalService.open(Edit);
    this.rfContact.setValue(this.dataCustomer[inx]);
    // console.log(this.dataCustomer[inx]);
    localStorage.setItem('indexEdit', inx);
  }

  saveEdit() {
    this.editElement = {
      id: this.rfContact.value.id,
      customer: this.rfContact.value.customer,
      address: this.rfContact.value.address,
      email: this.rfContact.value.email,
      phone: this.rfContact.value.phone,
      time: this.currentTime,
    };
    this.inx = localStorage.getItem('indexEdit');
    this.dataCustomer[this.inx] = this.editElement;
    localStorage.setItem('customer', JSON.stringify(this.dataCustomer));
    localStorage.removeItem('indexEdit');
    this.modalService.dismissAll();
  }
  saveEditSearch(){
    this.editElementSearch = {
      id: this.rfContactEditSearch.value.id,
      customer: this.rfContactEditSearch.value.customer,
      address: this.rfContactEditSearch.value.address,
      email: this.rfContactEditSearch.value.email,
      phone: this.rfContactEditSearch.value.phone,
      time: this.currentTime,
    };
    let updateElement = this.dataCustomer.filter(
      (item:any) =>
        item.id !== this.rfContactEditSearch.value.id
    );//cha ve element co id chung voi id element can sua
    this.dataCustomer = this.dataCustomer.filter(
      (item:any) =>
        item.id !== this.rfContactEditSearch.value.id
    );
    this.dataCustomer.push(this.editElementSearch);
    localStorage.setItem('customer', JSON.stringify(this.dataCustomer));
    this.modalService.dismissAll();
  }

  openSearch(search: any) {
    this.modalService.open(search);
    // console.log(this.rfContactSearch.value.search);
    // this.listSearch = this.dataCustomer.filter(
    //   (customer: { customer: any }) =>
    //     customer.customer === this.rfContactSearch.value.search
    // );
    this.listSearch = this.dataCustomer.filter(
      (customer:any) =>
      customer.customer.toLowerCase().includes(this.rfContactSearch.value.search.toLowerCase())
    );

  }
  exitSearch() {
    this.rfContact.reset();
    this.modalService.dismissAll();
  }


  ngOnInit(): void {
    this.rfContact = this.fb.group({
      id: [''],
      customer: ['', Validators.required],
      address: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      time:[''],
    });

    this.rfContactEditSearch = this.fb.group({
      id: [''],
      customer: ['', Validators.required],
      address: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      time:[''],
    });

    this.rfContactSearch = this.fb.group({
      search: [''],
    });
  }

  onDelete(i: any) {
    this.dataCustomer.splice(i, 1);
    localStorage.setItem('customer', JSON.stringify(this.dataCustomer));
  }

  openEditSearch(Edit:any,id:any){
    console.log(id);
    this.editElementSearch = this.dataCustomer.filter(
      (item:any) =>
        item.id === id
    );
    console.log(this.editElementSearch);

    this.modalService.open(Edit);
    this.rfContactEditSearch.setValue(this.editElementSearch[0]);

  }

  onDeleteSearch(id:any, search:any){
    console.log(id);
    this.dataCustomer = this.dataCustomer.filter(
      (item:any)=>
        item.id !== id
    )
    // this.modalService.dismissAll();
    localStorage.setItem('customer', JSON.stringify(this.dataCustomer));
    this.openSearch(search);
  }
}
