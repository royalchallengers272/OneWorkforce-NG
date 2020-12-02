import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-directory',
  templateUrl: './directory.component.html',
  styleUrls: ['./directory.component.scss']
})
export class DirectoryComponent implements OnInit {
  @Input() isManagerOut:any;
  rowData:[{}];
  columnDefs = [
    { field: 'emp_no',sortable: true, filter: true },
    { field: 'birth_date',sortable: true, filter: true },
    { field: 'first_name',sortable: true, filter: true},
    { field: 'last_name',sortable: true, filter: true},
    { field: 'hire_date',sortable: true, filter: true}
];
  constructor() { }

  ngOnInit() {
  }

}
