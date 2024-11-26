import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { hasEmailError, isRequired } from '../utils/validators';
import { FormRegister } from '../../../interfaces/register';
import { NewUser } from '../../../interfaces/NewUser';
import { AccessService } from '../../../core/services/access.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styles: '',
})
export class RegisterComponent {
  private _fb = inject(FormBuilder);
  private accessService = inject(AccessService);
  private router = inject(Router);

  isRequired(field: 'username' | 'password' | 'email') {
    return isRequired(field, this.form);
  }

  hasEmailError() {
    return hasEmailError(this.form);
  }

  form = this._fb.group<FormRegister>({
    username: this._fb.control('', Validators.required),
    email: this._fb.control('', [Validators.required, Validators.email]),
    password: this._fb.control('', Validators.required),
  });

  submit() {
    if (this.form.invalid) return;

    const user: NewUser = {
      username: this.form.controls.username.value,
      email: this.form.controls.email.value,
      password: this.form.controls.password.value,
    };

    if (!user.username || !user.password) return;

    this.accessService.register(user).subscribe({
      next: (res) => {
        if (res.token) {
          localStorage.setItem('token', res.token);
          this.router.navigate(['/']);
        } else {
          alert('No se pudo registrar el usuario');
        }
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
