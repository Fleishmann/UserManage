import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  userForm: FormGroup;
  isEditMode = false;
  userId: string | null = null;
  sexos = [
    { value: 0, viewValue: 'Masculino' },
    { value: 1, viewValue: 'Feminino' }
  ];
  hide = true; // Adicionado para controle de visualização de senha

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.userForm = this.fb.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, this.securePasswordValidator()]],
      dataNascimento: ['', Validators.required],
      sexo: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id');
    if (this.userId) {
      this.isEditMode = true;
      this.userService.getUser(this.userId).subscribe(
        user => {
          this.userForm.patchValue(user);
        },
        error => {
          console.error('Error loading user:', error);
        }
      );
    }
  }

  securePasswordValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const password: string = control.value;
      if (!password) {
        return null; // Se não houver senha, não aplicar validação
      }

      // Lógica de validação da senha
      if (password.length < 8 ||
          !/[0-9]/.test(password) ||
          !/[a-zA-Z]/.test(password) ||
          !/[A-Z]/.test(password)) {
        return { 'securePassword': true }; // Senha não atende aos critérios
      }

      return null;
    };
  }

  get NomeErrors() {
    return this.userForm.get('nome')?.errors || {};
  }

  get EmailErrors() {
    return this.userForm.get('email')?.errors || {};
  }

  get PasswordErrors() {
    return this.userForm.get('password')?.errors || {};
  }

  togglePasswordVisibility(): void {
    this.hide = !this.hide; // Alterna entre mostrar e ocultar a senha
  }

  get DataNascimentoErrors() {
    return this.userForm.get('dataNascimento')?.errors || {};
  }

  get SexoErrors() {
    return this.userForm.get('sexo')?.errors || {};
  }

  navigateBack(): void {
    this.router.navigate(['/users']);
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      const formData = this.userForm.value;
      if (this.isEditMode) {
        this.userService.updateUser(this.userId!, formData).subscribe(
          () => {
            this.router.navigate(['/users']);
          },
          error => {
            console.error('Error updating user:', error);
          }
        );
      } else {
        this.userService.addUser(formData).subscribe(
          () => {
            this.router.navigate(['/users']);
          },
          error => {
            console.error('Error adding user:', error);
          }
        );
      }
    }
  }
}
