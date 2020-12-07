import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-leaves',
  templateUrl: './leaves.component.html',
  styleUrls: ['./leaves.component.scss']
})
export class LeavesComponent implements OnInit {
  @Input() isManagerOut:any;
  @Input() isHrOut:any;
  @Input() employee_number:any;
  getServerDataLeave: any;
  rowData:any;
  rowDataHistory:any;
  applyLeaveSaved:boolean=false;
  leaveType:any="";
  leaveReason:any="";
  leaveStartDt:any="";
  leaveEnd:any="";
  leaveActionSaved:boolean=false;
  leaveActionRadio:any="";
  leaveActionComments:any="";
  clickedLeaveEmpId:any;
  columnDefs = [
    { headerName: '',field: 'leave_id',hide: true },
    { headerName: 'Employee Name',field: 'empname',sortable: true, filter: true },
    { headerName: 'Leave Type',field: 'leave_type',sortable: true, filter: true},
    { headerName: 'Start Date',field: 'from_date',sortable: true, filter: true},
    { headerName: 'End Date',field: 'to_date',sortable: true, filter: true},
    { headerName: 'Reason',field: 'reason',sortable: true, filter: true },
    { headerName: '',field:'approver_id',hide: true  },
    {
      headerName: 'Action',
      field: 'emp_no',
     // onCellClicked : (function (params) { self.addTab(params.value);}),
      cellRenderer : (function (params) {return '<button type="button" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#leaveApproval">Action</button>';}),
      sortable: false, filter: false
      
    }
];
columnDefsHistory = [
  { headerName: 'Start Date',field: 'from_date',sortable: true, filter: true },
  { headerName: 'End Date',field: 'to_date',sortable: true, filter: true },
  { headerName: 'Employee Reason',field: 'reason',sortable: true, filter: true},
  { headerName: 'Status',field: 'reason',sortable: true, filter: true},
  { headerName: 'Manager Comments',field: 'reason',sortable: true, filter: true}
];
  constructor(private http: HttpClient) { }
  onCellClicked(event: any) { 
    console.log('cell', event.data); 
    this.clickedLeaveEmpId= event.data;
  }
  ngOnInit() {
    this.leaveActionSaved=false;
    this.applyLeaveSaved = false;
    this.http.get<any>('http://oneworkforcesvc-env-1.eba-hf6yw8qp.us-west-1.elasticbeanstalk.com/ONEWORKFORCE/api/getPendingleaves?emp_no='+this.employee_number).subscribe(data => {
      this.rowData = data;
    })  
    this.http.get<any>('http://oneworkforcesvc-env-1.eba-hf6yw8qp.us-west-1.elasticbeanstalk.com/ONEWORKFORCE/api/getleavedetails?emp_no='+this.employee_number).subscribe(data => {
      this.rowDataHistory = data;
    })  
}
public applyLeave() {
  let headers = { 'content-type': 'application/json'} ;
  this.applyLeaveSaved = true;
  let empSaveObj = {"emp_no":this.employee_number,"leave_type":this.leaveType,"from_date":this.leaveStartDt,"to_date":this.leaveEnd,"approval_status":"Pending","reason":this.leaveReason};
  let body=JSON.stringify(empSaveObj);
  this.http.post<any>('http://oneworkforcesvc-env-1.eba-hf6yw8qp.us-west-1.elasticbeanstalk.com/ONEWORKFORCE/api/submitleave',body,{'headers':headers}).subscribe(data => {
          this.applyLeaveSaved = true;
          this.ngOnInit();
    })
}
public leaveAppRejAction() {
  let headers = { 'content-type': 'application/json'} ;
  this.leaveActionSaved = true;
  let empSaveObj = {"leave_id":this.clickedLeaveEmpId.leave_id,"approval_status":this.leaveActionRadio,"approvercomments":this.leaveActionComments,"approver_id":this.clickedLeaveEmpId.approver_id};
  let body=JSON.stringify(empSaveObj);
  this.http.post<any>('http://oneworkforcesvc-env-1.eba-hf6yw8qp.us-west-1.elasticbeanstalk.com/ONEWORKFORCE/api/updateleave',body,{'headers':headers}).subscribe(data => {
          this.leaveActionSaved = true;
          this.ngOnInit();
    })
}

}
