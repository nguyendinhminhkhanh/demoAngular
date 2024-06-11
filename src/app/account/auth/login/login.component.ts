import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  rfContact: any;
  public dataUser = <any>[];
  checkSignIn: any;
  checkFalseSignIn: any;
  constructor(private fb: FormBuilder, private router: Router) {}
  ngOnInit(): void {
    this.rfContact = this.fb.group({
      email: ['', Validators.required, Validators.email],
      password: ['', Validators.required],
    });
  }
  onSignIn() {
    this.checkSignIn = false;
    this.checkFalseSignIn = false;
    this.dataUser =
      JSON.parse(localStorage.getItem('user') as string) || <any>[];
    if (
      this.dataUser.find(
        (user: any) =>
          user.email == this.rfContact.value.email &&
          user.password == this.rfContact.value.password
      )
    ) {
      this.checkSignIn = true;
      console.log('Đăng nhập thành công!');
      
      localStorage.setItem("isLogin","true");
      localStorage.setItem("currentAccount",this.rfContact.value.email);
      this.router.navigateByUrl('/pages/customer');
      return;
    } else {
      this.checkFalseSignIn = true;
      console.log('Thông tin email hoặc mật khẩu không chính xác!');
    }
  }
}
