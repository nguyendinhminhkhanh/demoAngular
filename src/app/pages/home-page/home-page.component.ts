import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent implements OnInit {
  currentAccount = localStorage.getItem('currentAccount');
  profileData:any;
  constructor(private router: Router) {}
  ngOnInit(): void {
    var listAccount = JSON.parse(localStorage.getItem('user')as string)||<any>[];
    listAccount.forEach((item:any) => {
      if(this.currentAccount == item.email){
        this.profileData = item;
      }
    });
  }
  logOut() {
    this.router.navigate(['/', 'account', 'auth', 'login']);
    localStorage.removeItem('isLogin');
    localStorage.removeItem('currentAccount');
  }
}
