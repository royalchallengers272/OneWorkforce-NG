import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-directory',
  templateUrl: './directory.component.html',
  styleUrls: ['./directory.component.scss']
})
export class DirectoryComponent implements OnInit {
  @Input() isManagerOut:any;
  rowData:any;
  columnDefs = [
    { field: 'emp_no',sortable: true, filter: true },
    { field: 'birth_date',sortable: true, filter: true },
    { field: 'first_name',sortable: true, filter: true},
    { field: 'last_name',sortable: true, filter: true},
    { field: 'hire_date',sortable: true, filter: true},
    { field: 'gender',sortable: true, filter: true},
    { field: 'email',sortable: true, filter: true}
];
  empOfManager: any;
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get<any>('http://ec2-52-53-164-188.us-west-1.compute.amazonaws.com:8080/ONEWORKFORCE/api/getAllEmployeeDetails').subscribe(data => {
            this.rowData=data;
    })
    this.http.get<any>('http://ec2-52-53-164-188.us-west-1.compute.amazonaws.com:8080/ONEWORKFORCE/api/getManagerEmployeeDetails?empid=10001').subscribe(data => {
            this.empOfManager = data.map(function (el) { return el.first_name+" "+el.last_name; });
    })
  }

}
