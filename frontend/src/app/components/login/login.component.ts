import { Component, Inject, OnInit } from '@angular/core';
import { OktaSignIn } from '@okta/okta-signin-widget';
import appConfig from '../../config/app-config';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm, NgModel, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  username: string = '';
  password: string = '';

  constructor() {}

  ngOnInit(): void {
    // this.oktaSignin.remove();

    // this.oktaSignin.renderEl(
    //   {
    //     el: '#okta-sign-in-widget'
    //   },
    //   (response: any) => {
    //     if(response.status === 'SUCCESS'){
    //       this.oktaAuth.signInWithRedirect();
    //     }
    //   },
    //   (error: any) =>{
    //     throw error;
    //   }
    // );
  }

  onSubmit(){
    if (this.username && this.password) {
    } else {
      alert('Please enter valid credentials');
    }
  }

}
