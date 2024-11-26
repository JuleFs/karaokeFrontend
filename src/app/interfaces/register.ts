import { FormControl } from "@angular/forms";

export interface FormRegister {
    username: FormControl<string | null>;
    email: FormControl<string | null>;
    password: FormControl<string | null>;
  }