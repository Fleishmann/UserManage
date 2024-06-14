import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  users = [];
  displayedColumns: string[] = ['nome', 'email', 'dataNascimento', 'sexo', 'actions'];

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe(
      (data) => {
        this.users = data;
      },
      (error) => {
        console.error('Error loading users:', error);
      }
    );
  }

  formatDate(date: string): string {
    const d = new Date(date);
    return d.toLocaleDateString('pt-BR');
  }

  formatSexo(sexo: number): string {
    return sexo === 0 ? 'Masculino' : 'Feminino';
  }

  editUser(id: string): void {
    this.router.navigate([`/users/user-edit/${id}`]);
  }

  deleteUser(id: string): void {
    this.userService.deleteUser(id).subscribe(
      () => {
        this.loadUsers();
      },
      (error) => {
        console.error('Error deleting user:', error);
      }
    );
  }

  logout(): void {
    this.authService.logout(); // Chame o método de logout do serviço de autenticação
    this.router.navigate(['/login']); // Navegue para a página de login após o logout
  }

  addUser(): void {
    this.router.navigate(['/users/user-add']);
  }

  viewUserAddresses(userId: string): void {
    this.router.navigate([`/users/${userId}/addresses`]);
  }
}