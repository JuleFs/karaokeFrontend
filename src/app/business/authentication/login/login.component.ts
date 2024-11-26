import { Component, inject } from '@angular/core';
import { AccessService } from '../../../core/services/access.service';
import { Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { isRequired } from '../utils/validators';
import { FormLogin } from '../../../interfaces/Login';
import { User } from '../../../interfaces/User';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styles: '',
})
export class LoginComponent {
  private _fb = inject(FormBuilder);
  private accessService = inject(AccessService);
  private router = inject(Router);

  isRequired(field: 'username' | 'password') {
    return isRequired(field, this.form);
  }

  form = this._fb.group<FormLogin>({
    username: this._fb.control('', Validators.required),
    password: this._fb.control('', Validators.required),
  });

  submit() {
    if (this.form.invalid) return;

    const user: User = {
      username: this.form.controls.username.value,
      password: this.form.controls.password.value,
    };

    if (!user.username || !user.password) return;

    this.accessService.login(user).subscribe({
      next: (res) => {
        if (res.token) {
          localStorage.setItem('token', res.token);
          this.router.navigate(['/']);
        } else {
          alert('Credenciales inválidas');
        }
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  register() {
    this.router.navigate(['/register']);
  }
}
