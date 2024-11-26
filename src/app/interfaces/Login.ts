import { FormControl } from '@angular/forms';

export interface FormLogin {
  username: FormControl<string | null>;
  password: FormControl<string | null>;
}
