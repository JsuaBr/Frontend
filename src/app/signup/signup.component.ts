import { Component, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent{

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private router: Router){};
  
  

  form = signal<FormGroup>(
    new FormGroup({
      name: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required]),
      confirmPassword: new FormControl(null, [Validators.required])
    })
  )

  onSubmit():void {
    const password = this.form().get('password')?.value;
    const confirmPassword = this.form().get('confirmPassword')?.value;

    if(password !== confirmPassword){
      alert('Las contraseñas no coinciden');
      return;
    }

    console.log(this.form().value);

    this.authService.register(this.form().value).subscribe(
      (response) => {
        alert('Registro exitoso');
        this.router.navigateByUrl('/login');
      },
      (error) => {
        alert('Registro falló, intente nuevamente');
        console.log(error);
      }
    )
  }


}
