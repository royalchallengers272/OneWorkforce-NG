import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-leaves',
  templateUrl: './leaves.component.html',
  styleUrls: ['./leaves.component.scss']
})
export class LeavesComponent implements OnInit {
  @Input() isManagerOut:any;
  getServerDataLeave: any;
  rowDataLeave:any;
  columnDefs = [
    { field: 'emp_no',sortable: true, filter: true },
    { field: 'name',sortable: true, filter: true},
    { field: 'from_date',sortable: true, filter: true},
    { field: 'to_date',sortable: true, filter: true},
    { field: 'reason',sortable: true, filter: true }
];

  constructor() { }

  ngOnInit() {
    this.rowDataLeave=[{"emp_no":"725639","name":"Varun","from_date":"Nov 30, 2020","to_date":"Dec 02, 2020","Reason":"Reason"},
    {"emp_no":"725639","name":"Varun","from_date":"Nov 30, 2020","to_date":"Dec 02, 2020","Reason":"Reason"},
    {"emp_no":"725639","name":"Varun","from_date":"Nov 30, 2020","to_date":"Dec 02, 2020","Reason":"Reason"},
    {"emp_no":"725639","name":"Varun","from_date":"Nov 30, 2020","to_date":"Dec 02, 2020","Reason":"Reason"},
    {"emp_no":"725639","name":"Varun","from_date":"Nov 30, 2020","to_date":"Dec 02, 2020","Reason":"Reason"},
    {"emp_no":"725639","name":"Varun","from_date":"Nov 30, 2020","to_date":"Dec 02, 2020","Reason":"Reason"},
    {"emp_no":"725639","name":"Varun","from_date":"Nov 30, 2020","to_date":"Dec 02, 2020","Reason":"Reason"},
    {"emp_no":"725639","name":"Varun","from_date":"Nov 30, 2020","to_date":"Dec 02, 2020","Reason":"Reason"}]
  }

}
