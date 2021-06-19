import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from '../user-list/model/User';
import * as _ from 'lodash';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { nanoid } from 'nanoid'
import { UserListService } from '../user-list/services/user-list.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  userForm: FormGroup;
  copy: User
  departmentList: string[] = [
    'Information & Communication Technology',
    'Computer Science & Engineering',
    'Economics',
    'Math',
    'Physic',
    'Chemistry',
    'Bangla',
    'English',
    'Social Science'
  ]

  filteredDept: Observable<string[]>;

  constructor(
    private fb: FormBuilder,
     private userListService : UserListService,
    private dialogRef : MatDialogRef<CreateUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      dialogTitle: string,
      model : User
    }
  ) {
    this.copy = _.cloneDeep(data.model);
  }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      userName: [this.copy.name, [Validators.required]],
      userAge: [this.copy.age, [Validators.required]],
      dept: [this.copy.dept, [Validators.required]],
      passingYear: [this.copy.year],
      result : [this.copy.result]
    })

    this.filteredDept = this.userForm.get('dept').valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      )
  }


  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.departmentList.filter(option => option.toLowerCase().includes(filterValue));
  }

  save() { 
    let {userName,userAge,dept,passingYear,result} = this.userForm.value;
    let submittedUser : User = {
      id : nanoid(),
      name: userName,
      age: userAge,
      dept,
      year: passingYear,
      result
    }
    if (this.userForm.valid && !this.copy.id) {
      this.userListService.addUser(submittedUser);
      this.dialogRef.close('Yes')
    } else if(this.userForm.valid && this.copy.id){
      this.userListService.updateUser(this.copy)
        .subscribe(res => {
          console.log(res)
        })
        this.dialogRef.close('Updated')
    }
  }

  cancel() {
    this.dialogRef.close();
  }

}
