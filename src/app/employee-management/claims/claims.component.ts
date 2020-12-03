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
  @Input() employee_number:any;
  getServerDataLeave: any;
  rowData:any;
  columnDefs = [
    { field: 'emp_no',sortable: true, filter: true },
    { field: 'expense_type',sortable: true, filter: true},
    { field: 'description',sortable: true, filter: true},
    { field: 'amount',sortable: true, filter: true},
    { field: 'created_date',sortable: true, filter: true }
];
claimSubmitted:boolean=false;
expenseType:any= "";
claimDesc:any= "";
claimAmount:any= "";
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.claimSubmitted = false;
    this.http.get<any>('http://ec2-52-53-164-188.us-west-1.compute.amazonaws.com:8080/ONEWORKFORCE/api/getPendingexpense?emp_no=10001').subscribe(data => {
      this.rowData = data;
    })  
  }
  public submitClaim() {
    let headers = { 'content-type': 'application/json'} ;
    let empSaveObj = {"emp_no":this.employee_number,"expense_type":this.expenseType,"description":this.claimDesc,"amount":this.claimAmount};
    let body=JSON.stringify(empSaveObj);
    this.claimSubmitted = true;
    this.http.post<any>('http://ec2-52-53-164-188.us-west-1.compute.amazonaws.com:8080/ONEWORKFORCE/api/submitexpense',body,{'headers':headers}).subscribe(data => {
            this.claimSubmitted = true;
      })
  }

}
