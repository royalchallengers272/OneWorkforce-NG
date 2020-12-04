import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-performance',
  templateUrl: './performance.component.html',
  styleUrls: ['./performance.component.scss']
})
export class PerformanceComponent implements OnInit {
  @Input() isManagerOut:any;
  @Input() isHrOut:any;
  @Input() employee_number:any;
  submitPerformanceSaved:boolean=false;
  perfYear:any="";
  perfDevGoals:any="";
  perfStrengths:any="";
  perfRespo:any="";
  perfAccom:any="";

  clickedPerfEmpId:any;
  evaPerfStat:any;
  evaPerfComm:any;
  evaluatePerformanceSaved:boolean=false;

  prevYear:any;
  prevDevGoals:any;
  prevStrength:any;
  prevRespon:any;
  prevAccompl:any;
  prevRating:any;


  columnDefs = [
    { headerName: '',field: 'performance_id',hide: true },
    { headerName: 'Employee Number',field: 'emp_no',sortable: true, filter: true },
    { headerName: 'Year',field: 'year',sortable: true, filter: true},
    { headerName: 'Development Goals',field: 'development_goals',sortable: true, filter: true},
    { headerName: 'Strengths',field: 'strengths',sortable: true, filter: true},
    { headerName: 'Accomplishments',field: 'accomplishments',sortable: true, filter: true },
    { headerName: 'Responsibilities',field: 'responsibilities',sortable: true, filter: true },
    { headerName: 'Created Date',field: 'created_date',sortable: true, filter: true },
    { headerName: 'Approval Date',field: 'approval_date',sortable: true, filter: true },
    { headerName: 'Status',field: 'status',sortable: true, filter: true },
    { headerName: '',field: 'approver_id',hide: true },
    { headerName: 'Approver Comments',field: 'approver_comments',sortable: true, filter: true },
    {
      headerName: 'Action',
      field: 'emp_no',
      //onCellClicked : (function (params) { console.log(JSON.stringify(params))}),
      cellRenderer : (function (params) {return '<button type="button" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#perfApproval">Rate</button>';}),
      sortable: false, filter: false
      
    }
];
rowData:any;
  constructor(private http: HttpClient) { }
  onCellClicked(event: any) { 
    console.log('cell', event.data); 
    this.clickedPerfEmpId= event.data;
  }
  ngOnInit() {
    this.evaluatePerformanceSaved=false;
    this.submitPerformanceSaved=false;
    this.http.get<any>('http://ec2-52-53-164-188.us-west-1.compute.amazonaws.com:8080/ONEWORKFORCE/api/getPendingperformance?emp_no='+this.employee_number).subscribe(data => {
      this.rowData = data;
    })  
    this.http.get<any>('http://ec2-52-53-164-188.us-west-1.compute.amazonaws.com:8080/ONEWORKFORCE/api/getlastyearperformance?emp_no='+this.employee_number).subscribe(data => {
              this.prevYear=data[0].year;
              this.prevDevGoals=data[0].development_goals;
              this.prevStrength=data[0].strengths;
              this.prevRespon=data[0].responsibilities;
              this.prevAccompl=data[0].accomplishments;
              this.prevRating=data[0].status;
    })
  }
  public submitPerformance() {
    let headers = { 'content-type': 'application/json'} ;
    this.submitPerformanceSaved = true;
    let empSaveObj = {"emp_no":this.employee_number,"year":this.perfYear,"development_goals":this.perfDevGoals,"strengths":this.perfStrengths,"accomplishments":this.perfAccom,"responsibilities":this.perfRespo};
    let body=JSON.stringify(empSaveObj);
    this.http.post<any>('http://ec2-52-53-164-188.us-west-1.compute.amazonaws.com:8080/ONEWORKFORCE/api/submitperformance',body,{'headers':headers}).subscribe(data => {
            this.submitPerformanceSaved = true;
            this.ngOnInit();
      })
  }
  public evaluatePerformance() {
    this.evaluatePerformanceSaved=true;
    let headers = { 'content-type': 'application/json'} ;
    this.submitPerformanceSaved = true;
    let empSaveObj = {"performance_id":this.clickedPerfEmpId.performance_id,"status":this.evaPerfStat,"approver_id":this.clickedPerfEmpId.approver_id,"approver_comments":this.evaPerfComm};
    let body=JSON.stringify(empSaveObj);
    this.http.post<any>('http://ec2-52-53-164-188.us-west-1.compute.amazonaws.com:8080/ONEWORKFORCE/api/updateperformance',body,{'headers':headers}).subscribe(data => {
          this.evaluatePerformanceSaved=true;
          this.ngOnInit();
    })
  }

}
