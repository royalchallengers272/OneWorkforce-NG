import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-leaves',
  templateUrl: './leaves.component.html',
  styleUrls: ['./leaves.component.scss']
})
export class LeavesComponent implements OnInit {
  @Input() isManagerOut:any;
  getServerDataLeave: any;
  rowData:any;
  columnDefs = [
    { field: 'emp_no',sortable: true, filter: true },
    { field: 'leave_type',sortable: true, filter: true},
    { field: 'from_date',sortable: true, filter: true},
    { field: 'to_date',sortable: true, filter: true},
    { field: 'reason',sortable: true, filter: true }
];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get<any>('http://ec2-52-53-164-188.us-west-1.compute.amazonaws.com:8080/ONEWORKFORCE/api/getPendingleaves?emp_no=10001').subscribe(data => {
      this.rowData = data;
    })  
}

}
