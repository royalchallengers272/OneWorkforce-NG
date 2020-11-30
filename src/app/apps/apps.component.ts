import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-apps',
  templateUrl: './apps.component.html',
  styleUrls: ['./apps.component.scss']
})
export class AppsComponent implements OnInit {
  getServerData: any;
  rowData:any;
  columnDefs = [
    { field: 'emp_no',sortable: true, filter: true },
    { field: 'birth_date',sortable: true, filter: true },
    { field: 'first_name',sortable: true, filter: true},
    { field: 'last_name',sortable: true, filter: true},
    { field: 'hire_date',sortable: true, filter: true}
];
  constructor(private http: HttpClient) { }
  public fetchServiceData(){
    this.http.get<any>('http://ec2-52-53-164-188.us-west-1.compute.amazonaws.com:8080/ONEWORKFORCE/api/getEmployeeDetails?empid=10001').subscribe(data => {
            console.log(JSON.stringify(data));
            this.getServerData = data;
            this.rowData = data;
        })
  }
  ngOnInit() {
  }

}
