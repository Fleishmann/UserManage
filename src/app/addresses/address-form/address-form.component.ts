import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AddressService } from '../../services/address.service';
import { CepService } from '../../services/cep.service';

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.scss']
})
export class AddressFormComponent implements OnInit {
  addressForm: FormGroup;
  isEditMode = false;
  addressId: string | null = null;
  userId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private addressService: AddressService,
    private router: Router,
    private route: ActivatedRoute,
    private cepService: CepService
  ) {
    this.addressForm = this.fb.group({
      cep: ['', [Validators.required, Validators.pattern(/^\d{5}-\d{3}$/)]],
      logradouro: ['', Validators.required],
      cidade: ['', Validators.required],
      bairro: [''],
      uf: ['', Validators.required],
      numero: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      complemento: ['']
    });
  }

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('userId');
    this.addressId = this.route.snapshot.paramMap.get('id');

    if (this.addressId) {
      this.isEditMode = true;
      this.addressService.getAddress(this.addressId).subscribe(
        address => {
          this.addressForm.patchValue(address);
        },
        error => {
          console.error('Error loading address:', error);
        }
      );
    }
  }

  get CepErrors() {
    return this.addressForm.get('cep')?.errors || {};
  }

  get LogradouroErrors() {
    return this.addressForm.get('logradouro')?.errors || {};
  }

  get CidadeErrors() {
    return this.addressForm.get('cidade')?.errors || {};
  }

  get UfErrors() {
    return this.addressForm.get('uf')?.errors || {};
  }

  get NumeroErrors() {
    return this.addressForm.get('numero')?.errors || {};
  }

  onSubmit(): void {
    if (this.addressForm.valid) {
      const formData = this.addressForm.value;
      if (this.isEditMode && this.addressId && this.userId) {
        this.addressService.updateAddress(this.addressId, this.userId, formData).subscribe(
          () => {
            this.router.navigate(['/addresses', this.userId]);
          },
          error => {
            console.error('Error updating address:', error);
          }
        );
      } else if (this.userId) {
        this.addressService.addAddress(formData, this.userId).subscribe(
          () => {
            this.router.navigate(['/addresses', this.userId]);
          },
          error => {
            console.error('Error adding address:', error);
          }
        );
      }
    }
  }

  navigateBack(): void {
    this.router.navigate(['/addresses', this.userId]);
  }

  formatCep(event: any): void {
    let value = event.target.value;
    value = value.replace(/\D/g, '');
    
    if (value.length === 8) {
      value = value.replace(/(\d{5})(\d{3})/, '$1-$2')
    }
    
    this.addressForm.get('cep')?.setValue(value);
  }

  fetchAddressByCep(): void {
    const cep = this.addressForm.get('cep')?.value;
    if (cep && cep.length === 9) {
      this.cepService.getAddressByCep(cep).subscribe(
        address => {
          this.addressForm.patchValue({
            logradouro: address.logradouro,
            cidade: address.localidade,
            bairro: address.bairro,
            uf: address.uf
          });
        },
        error => {
          console.error('Error fetching address by CEP:', error);
        }
      );
    }
  }

  onlyNumber(event: any): void {
    const input = event.target as HTMLInputElement;
    let value = input.value;
    value = value.replace(/\D/g, '');
    this.addressForm.get('numero')?.setValue(value);
  }
}
