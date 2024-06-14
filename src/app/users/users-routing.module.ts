import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { UserFormComponent } from './user-form/user-form.component';
import { AddressListComponent } from '../addresses/address-list/address-list.component';

const routes: Routes = [
  { path: '', component: UserListComponent },
  { path: 'user-add', component: UserFormComponent },
  { path: 'user-edit/:id', component: UserFormComponent },
  { path: ':userId/addresses', component: AddressListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }