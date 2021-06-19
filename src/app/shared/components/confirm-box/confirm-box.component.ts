import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-box',
  templateUrl: './confirm-box.component.html',
  styleUrls: ['./confirm-box.component.css']
})
export class ConfirmBoxComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ConfirmBoxComponent>,
    @Inject(MAT_DIALOG_DATA) public data : {dialogTitle : string,name : string}
  ) { }

  ngOnInit(): void {
  }

  closeDialog() {
    this.dialogRef.close("No")
  }

  deleteData() {
    this.dialogRef.close("Yes")
  }
}
