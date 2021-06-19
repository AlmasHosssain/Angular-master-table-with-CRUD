import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserListComponent } from './components/user-list/user-list.component';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { ToastrModule } from 'ngx-toastr';
const routes: Routes = [
  {
    path: '',
    component : UserListComponent 
  }
]

@NgModule({
  declarations: [
    UserListComponent,
    CreateUserComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
  ],
  entryComponents: [
    CreateUserComponent
  ]
})
export class UsersModule { }
