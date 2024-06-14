import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddressListComponent } from './address-list/address-list.component';
import { AddressFormComponent } from './address-form/address-form.component'; // Ajuste o nome do componente conforme necessário

const routes: Routes = [
  { path: ':userId', component: AddressListComponent },
  { path: 'address-add/:userId', component: AddressFormComponent },
  { path: ':userId/address-edit/:id', component: AddressFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddressesRoutingModule { }
