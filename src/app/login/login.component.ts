import { Component, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { UserStorageService } from '../services/storage/user-storage.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private router: Router){};
  
  form = signal<FormGroup>(
    new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required])
    })
  )

  onSubmit():void {
    const username = this.form().get('email')?.value;
    const password = this.form().get('password')?.value;

    console.log(this.form().value);

    this.authService.login(username, password).subscribe(
      (response) => {
        if(UserStorageService.isAdminLoggedIn()){
          this.router.navigateByUrl('admin/dashboard');
        }else if(UserStorageService.isCustomerLoggedIn){
          this.router.navigateByUrl('customer/dashboard');
        }
      },
      (error) => {
        alert('Loggeo falló, intente nuevamente');
        console.log(error);
      }
    )
  }
}
