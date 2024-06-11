import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnInit {
  rfContact: any;
  public dataUser = <any>[];
  checkUser: any;
  checkForm: any;
  checkSuccess: any;
  constructor(private fb: FormBuilder, private router: Router) {}
  ngOnInit(): void {
    this.rfContact = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
  onRegister() {
    this.checkUser = false;
    this.checkForm = false;
    this.checkSuccess = false;
    // console.log(this.rfContact.invalid);
    this.dataUser =
      JSON.parse(localStorage.getItem('user') as string) || <any>[];
    if (
      this.dataUser.find(
        (user: any) => user.email == this.rfContact.value.email
      )
    ) {
      // check xem tài khoản đã được đăng kí chưa
      this.checkUser = true;
      console.log('Tài khoản này đã tồn tại!!');
      this.rfContact.reset();
      return;
    } else if (this.rfContact.invalid) {
      //check xem đúng điều kiện của formBuilder chưa
      this.checkForm = true;
      console.log('Hãy đăng kí bằng email và mật khẩu > 6 kí tự');
      return;
    } else {
      this.dataUser.push({
        firstName: this.rfContact.value.firstName,
        lastName: this.rfContact.value.lastName,
        email: this.rfContact.value.email,
        password: this.rfContact.value.password,
      });
      localStorage.setItem('user', JSON.stringify(this.dataUser));
      this.checkSuccess = true;
      console.log('Đăng kí thành công!!');
      // alert('Đăng kí thành công!');
      this.rfContact.reset(); 
      return;
    }
  }
}
