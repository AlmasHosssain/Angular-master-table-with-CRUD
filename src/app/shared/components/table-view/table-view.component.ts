import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { TableColumn } from './model/TableColumn';
import { User } from '../../../views/users/components/user-list/model/User';

@Component({
  selector: 'app-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class TableViewComponent implements OnInit, AfterViewInit  {
  selectedData
  @ViewChild(MatPaginator, { static: true }) matPaginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) matSort: MatSort;
  
  dataSource
  displayedColumns: string[];

  @Input() isSortAble = false;
  @Input() isPageAble = false;
  @Input() isFilterAble = false;
  @Input() tableColumn: TableColumn[];
  @Input() paginationSizes: number[] = [5, 10, 15];
  @Input() defaultPageSize = this.paginationSizes[1];
  @Output() sort: EventEmitter<Sort> = new EventEmitter();
  @Output() updateUser: EventEmitter<User> = new EventEmitter();
  @Output() deleteUser: EventEmitter<User> = new EventEmitter();
  

  @Input() set tableData(data : any[]) {
   this.setTableDataSource(data)
 }
  constructor() { }

  ngOnInit(): void {
    this.displayedColumns = this.tableColumn
      .map((column: TableColumn)=> column.tableColumnName)
  }
  
  ngAfterViewInit(): void {
    
  }

  setTableDataSource(data: any) {
    this.dataSource = new MatTableDataSource<any>(data);
    this.dataSource.paginator = this.matPaginator;
    this.dataSource.sort = this.matSort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  
  sortTable(sortParameters: Sort) {
    sortParameters.active = this.tableColumn
      .find(column => column.tableColumnName == sortParameters.active).key;
    this.sort.emit(sortParameters)
  }
  

  update(user : User) {
    this.updateUser.emit(user)
  }

  delete(user : User) {
    this.deleteUser.emit(user)
  }

}
