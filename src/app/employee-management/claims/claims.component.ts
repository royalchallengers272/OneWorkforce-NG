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
  clickedClaimEmpId:any;
  claimActionSaved:boolean=false;
  rowData:any;
  columnDefs = [
    { headerName: '',field: 'expense_id',hide: true },
    {  headerName: 'Employee number',field: 'emp_no',sortable: true, filter: true },
    {  headerName: 'Expense Type',field: 'expense_type',sortable: true, filter: true},
    {  headerName: 'Description',field: 'description',sortable: true, filter: true},
    { headerName: 'Amount',field: 'amount',sortable: true, filter: true},
    { headerName: 'Created Date',field: 'created_date',sortable: true, filter: true },
    { headerName: '',field:'approver_id',hide: true  },
    {
      headerName: 'Action',
      field: 'emp_no',
     // onCellClicked : (function (params) { self.addTab(params.value);}),
      cellRenderer : (function (params) {return '<button type="button" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#leaveApproval">Action</button>';}),
      sortable: false, filter: false
      
    }
];
claimSubmitted:boolean=false;
expenseType:any= "";
claimDesc:any= "";
claimAmount:any= "";
claimActionComments:any="";
claimActionRadio:any="";
rowDataHistory:any;
columnDefsHistory = [
  {  headerName: 'Employee number',field: 'emp_no',sortable: true, filter: true },
  {  headerName: 'Expense Type',field: 'expense_type',sortable: true, filter: true},
  {  headerName: 'Description',field: 'description',sortable: true, filter: true},
  { headerName: 'Amount',field: 'amount',sortable: true, filter: true},
  { headerName: 'Created Date',field: 'created_date',sortable: true, filter: true }
];

  constructor(private http: HttpClient) { }
  onCellClicked(event: any) { 
    console.log('cell', event.data); 
    this.clickedClaimEmpId= event.data;
  }
  ngOnInit() {
    this.claimActionSaved=false;
    this.claimSubmitted = false;
    this.http.get<any>('http://ec2-52-53-164-188.us-west-1.compute.amazonaws.com:8080/ONEWORKFORCE/api/getPendingexpense?emp_no='+this.employee_number).subscribe(data => {
      this.rowData = data;
    })  
    this.http.get<any>('http://ec2-52-53-164-188.us-west-1.compute.amazonaws.com:8080/ONEWORKFORCE/api/getPendingexpense?emp_no='+this.employee_number).subscribe(data => {
      this.rowDataHistory = data;
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
  public claimAppRejAction() {
    let headers = { 'content-type': 'application/json'} ;
    this.claimActionSaved = true;
    let empSaveObj = {"approver_id":this.clickedClaimEmpId.approver_id,"status":this.claimActionRadio,"expense_id":this.clickedClaimEmpId.expense_id};
    let body=JSON.stringify(empSaveObj);
    this.http.post<any>('http://ec2-52-53-164-188.us-west-1.compute.amazonaws.com:8080/ONEWORKFORCE/api/updateexpense',body,{'headers':headers}).subscribe(data => {
            this.claimActionSaved = true;
      })
  }

}
