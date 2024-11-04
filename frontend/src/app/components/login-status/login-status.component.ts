import { CommonModule, NgIf } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login-status',
  standalone: true,
  imports: [NgIf, CommonModule, RouterModule],
  templateUrl: './login-status.component.html',
  styleUrl: './login-status.component.css'
})
export class LoginStatusComponent implements OnInit {

  isAuthenticated: boolean = false;
  userFullName: string = '';

  constructor(){}


  ngOnInit(): void {
    // this.oktaAuthService.authState$.subscribe(
    //   (result) => {
    //     this.isAuthenticated = result.isAuthenticated!;
    //     this.getUserDetails();
    //   }
    // );
  }

  getUserDetails() {
    // if(this.isAuthenticated){
    //   this.oktaAuth.getUser().then(
    //     (res) =>{
    //       this.userFullName = res.name as string;
    //     }
    //   )
    // }
  }

  logout(){
    // this.oktaAuth.signOut();
  }

}
