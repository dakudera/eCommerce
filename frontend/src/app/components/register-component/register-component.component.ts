import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register-component',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register-component.component.html',
  styleUrl: './register-component.component.css'
})
export class RegisterComponentComponent {

  username: string = '';
  firstName: string = '';
  lastName: string = '';
  password: string = '';
  email: string = '';

  onSubmit() {
    if (this.username && this.password && this.email) {
      // Your registration logic here
      console.log('Registration data:', { username: this.username, email: this.email, password: this.password
        , firstName: this.firstName,  lastName: this.lastName});
      alert('Registration successful!');
    } else {
      alert('Please fill out all fields');
    }
  }

}
