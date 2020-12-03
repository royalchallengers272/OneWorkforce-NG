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
    { headerName: 'Employee number',field: 'emp_no',sortable: true, filter: true },
    { headerName: 'First Name',field: 'first_name',sortable: true, filter: true },
    { headerName: 'Last Name',field: 'last_name',sortable: true, filter: true},
    { headerName: 'Email',field: 'email',sortable: true, filter: true},
    { headerName: 'Manager',field: 'managername',sortable: true, filter: true},
    { headerName: 'Phone',field: 'city',sortable: true, filter: true},
    { headerName: 'Department',field: 'department',sortable: true, filter: true}
];
  empOfManager: any;
  constructor(private http: HttpClient) { }

  ngOnInit() {
    if(this.isManagerOut){
      this.http.get<any>('http://ec2-52-53-164-188.us-west-1.compute.amazonaws.com:8080/ONEWORKFORCE/api/getManagerEmployeeDetails?empid=10001').subscribe(data => {
            this.rowData=data;
      })
    }
    // this.http.get<any>('http://ec2-52-53-164-188.us-west-1.compute.amazonaws.com:8080/ONEWORKFORCE/api/getManagerEmployeeDetails?empid=10001').subscribe(data => {
    //         this.empOfManager = data.map(function (el) { return el.first_name+" "+el.last_name; });
    // })
  }

}
