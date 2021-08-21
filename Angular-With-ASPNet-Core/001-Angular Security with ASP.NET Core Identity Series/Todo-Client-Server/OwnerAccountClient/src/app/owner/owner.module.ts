import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {OwnerListComponent} from './owner-list/owner-list.component';
import {RouterModule, Routes} from '@angular/router';
import {OwnerDetailsComponent} from './owner-details/owner-details.component';
import {SharedModule} from "../shared/shared.module";
import {OwnerCreateComponent} from './owner-create/owner-create.component';

const routes: Routes = [
  {path: 'list', component: OwnerListComponent},
  {path: 'details/:id', component: OwnerDetailsComponent},
  {path: 'create', component: OwnerCreateComponent}
];

@NgModule({
  declarations: [
    OwnerListComponent,
    OwnerDetailsComponent,
    OwnerCreateComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class OwnerModule {
}
