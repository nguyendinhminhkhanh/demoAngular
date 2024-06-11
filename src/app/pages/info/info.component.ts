import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-info',
  standalone: true,
  imports: [],
  templateUrl: './info.component.html',
  styleUrl: './info.component.scss',
})
export class InfoComponent implements OnInit {
  profileData: any;
  constructor(private router: Router){}
  ngOnInit(): void {
    var show = localStorage.getItem("currentAccount");
    var listAccount = JSON.parse(localStorage.getItem('user')as string)||<any>[];
    listAccount.forEach((item:any) => {
      if(show == item.email){
        this.profileData = item;
      }
    });
  }
  onChange(){
    this.router.navigate(["/","pages","change-pasword"]);
  }
}
