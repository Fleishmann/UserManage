import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AddressService } from '../../services/address.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-address-list',
  templateUrl: './address-list.component.html',
  styleUrls: ['./address-list.component.scss']
})
export class AddressListComponent implements OnInit {
  addresses: any[] = [];
  userName: string = '';
  userId: string | null = null;

  displayedColumns: string[] = ['cep', 'logradouro', 'numero', 'complemento', 'bairro', 'cidade', 'uf', 'actions'];

  constructor(
    private route: ActivatedRoute,
    private addressService: AddressService,
    private authService: AuthService,
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('userId');

    if (this.userId) {
      this.loadAddresses();
      this.loadUserName();
    }
  }

  loadAddresses(): void {
    if (!this.userId) {
      return;
    }

    this.addressService.getAddressesByUserId(this.userId).subscribe(
      addresses => {
        this.addresses = addresses;
      },
      error => {
        console.error('Error loading addresses:', error);
      }
    );
  }

  loadUserName(): void {
    if (!this.userId) {
      return;
    }

    this.userService.getUser(this.userId).subscribe(
      user => {
        this.userName = user.nome;
      },
      error => {
        console.error('Error loading user name:', error);
      }
    );
  }

  editAddress(addressId: string): void {
    this.router.navigate([`/addresses/${this.userId}/address-edit/${addressId}`]);
  }

  deleteAddress(addressId: string): void {
    this.addressService.deleteAddress(addressId).subscribe(
      () => {
        this.loadAddresses();
      },
      error => {
        console.error('Error deleting address:', error);
      }
    );
  }

  addAddress(): void {
    if (this.userId) {
      this.router.navigate([`/addresses/address-add/${this.userId}`]);
    }
  }

  goBack(): void {
    this.router.navigate(['/users']);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
