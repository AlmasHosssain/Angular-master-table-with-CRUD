import { Component, OnInit } from '@angular/core';
import { User } from './model/User';
import { TableColumn } from '../../../../shared/components/table-view/model/TableColumn';
import { Sort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { CreateUserComponent } from '../create-user/create-user.component';
import { ToastrService } from 'ngx-toastr';
import { ConfirmBoxComponent } from '../../../../shared/components/confirm-box/confirm-box.component';
import { UserListService } from './services/user-list.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  
  users: User[];
  usersTableColumn: TableColumn[];
  constructor(
    private dialog: MatDialog,
    private toaster: ToastrService,
    private userListService : UserListService
  ) { }

  ngOnInit(): void {
    this.columnInfo();
    this.userListService.getAllUser().subscribe(res => {
      this.users = res
    })
  }

  addCommitteeDesignation() {
    const dialogRef = this.dialog.open(CreateUserComponent, {
      width: '50%',
      data: {
        dialogTitle: 'Add a new user',
        model : new User()
      }
    }).afterClosed().subscribe(res => {
      if (res) {
        this.ngOnInit(),
        this.toaster.success('User added successfully')
      }
    })
  }
  
  sortData(sortParameters : Sort) {
    const keyName = sortParameters.active;
    if (sortParameters.direction == 'asc') {
      this.users = this.users.sort((a : User,b : User) => 
        a[keyName].localeCompare(b[keyName])
      )
    } else if(sortParameters.direction == 'desc'){
      this.users = this.users.sort((b: User, a: User) =>
        b[keyName].localeCompare(a[keyName])
      )
    } else {
      this.users;
    }
  }


  updateUser(user : User) {
    const dialogRef = this.dialog.open(CreateUserComponent, {
      width: '50%',
      data: {
        dialogTitle: 'Update a user',
        model : user
      }
    }).afterClosed().subscribe(res => {
      if (res == 'Updated') {
        this.ngOnInit(),
        this.toaster.success('User updated successfully')
      }
    })
  }

  deleteUser(user) {
    const dialogRef = this.dialog.open(ConfirmBoxComponent, {
      width: '25%',
      data: {
        dialogTitle: '',
        name : user.name
      }
    }).afterClosed().subscribe(res => {
      if (res == 'Yes') {
        this.userListService.deleteUser(user)
          .subscribe(res => {
            this.ngOnInit(),
            this.toaster.success('User deleted successfully')
          })
        
      }
    })
  }

  columnInfo(): void {
    this.usersTableColumn = [
      {
        tableColumnName: 'Name',
        key: 'name',
        position: 'left',
        isSortAble : true
      },
      {
        tableColumnName: 'Age',
        key: 'age',
        position: 'left',
        isSortAble : true
      },
      {
        tableColumnName: 'Department',
        key: 'dept',
        position: 'left',
        isSortAble : true
      },
      {
        tableColumnName: 'Passing year',
        key: 'year',
        position: 'left',
        isSortAble : true
      },
      {
        tableColumnName: 'Result',
        key: 'result',
        position: 'left',
        isSortAble : false
      },
      {
        tableColumnName: 'Action',
        key: 'action',
        isAction: true,
        action : ['update','delete']
      }
    ]
  }
}
