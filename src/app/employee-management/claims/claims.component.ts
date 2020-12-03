import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-claims',
  templateUrl: './claims.component.html',
  styleUrls: ['./claims.component.scss']
})
export class ClaimsComponent implements OnInit {
  @Input() isManagerOut:any;
  @Input() isHrOut:any;
  getServerDataLeave: any;
  rowData:any;
  columnDefs = [
    { field: 'emp_no',sortable: true, filter: true },
    { field: 'expense_type',sortable: true, filter: true},
    { field: 'description',sortable: true, filter: true},
    { field: 'amount',sortable: true, filter: true},
    { field: 'created_date',sortable: true, filter: true }
];
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get<any>('http://ec2-52-53-164-188.us-west-1.compute.amazonaws.com:8080/ONEWORKFORCE/api/getPendingexpense?emp_no=10001').subscribe(data => {
      this.rowData = data;
    })  
  }

}
