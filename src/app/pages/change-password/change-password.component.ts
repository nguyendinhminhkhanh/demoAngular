import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss'
})
export class ChangePasswordComponent implements OnInit{
  rfContact: any;
  constructor(private router:Router, private fb:FormBuilder){}
  ngOnInit(): void {
    this.rfContact = this.fb.group({
      email: ['',Validators.required],
      password: ['',Validators.required],
      passwordNew: ['',Validators.required],
      againPassword: ['',Validators.required],
    })
  }
  onChange(){
    if(this.rfContact.invalid){
      console.log("Hãy nhập đủ thông tin");
      console.log();
      return;}

    // }else if(this.rfContact.pass){

    // }
  }
  onExit(){
    this.router.navigate(['/','pages','info'])
  }
}
