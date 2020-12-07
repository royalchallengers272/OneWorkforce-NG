import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-directory',
  templateUrl: './directory.component.html',
  styleUrls: ['./directory.component.scss']
})
export class DirectoryComponent implements OnInit {
  @Input() isManagerOut:any;
   @Input() isHrOut:any;
   @Input() employee_number:any;
  rowData:any;
  columnDefs = [
    { headerName: 'Employee number',field: 'emp_no',sortable: true, filter: true },
    { headerName: 'First Name',field: 'first_name',sortable: true, filter: true },
    { headerName: 'Last Name',field: 'last_name',sortable: true, filter: true},
    { headerName: 'Email',field: 'email',sortable: true, filter: true},
    { headerName: 'Manager',field: 'managername',sortable: true, filter: true},
    { headerName: 'Phone',field: 'phone',sortable: true, filter: true},
    { headerName: 'Department',field: 'department',sortable: true, filter: true}
];

  empOfManager: any;
  fName:any;
  lName:any;
  email:any;
  address1:any;
  address2:any;
  city:any;
  state:any;
  zip:any;
  department:any;
  theatre:any;
  phone:any;
  profileSaved:boolean=false;
  profileEdit:boolean=false;

  fName_S:any= "";
  lName_S:any= "";
  empNumber_S:any= "";
  email_S:any= "";
  phone_S:any= "";
  department_S:any= "";

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.profileSaved = false;
    this.profileEdit = false;
    this.http.get<any>('http://oneworkforcesvc-env-1.eba-hf6yw8qp.us-west-1.elasticbeanstalk.com/ONEWORKFORCE/api/getEmployeeDetails?empid='+this.employee_number).subscribe(data => {
              this.fName=data[0].first_name;
              this.lName=data[0].last_name;
              this.email=data[0].email;
              this.address1=data[0].address1;
              this.address2=data[0].address2;
              this.city=data[0].city;
              this.state=data[0].state;
              this.zip=data[0].zip;
              this.department=data[0].department;
              this.phone=data[0].phone;
              this.theatre=data[0].theatre;
    })
    if(this.isManagerOut){
      this.http.get<any>('http://oneworkforcesvc-env-1.eba-hf6yw8qp.us-west-1.elasticbeanstalk.com/ONEWORKFORCE/api/getManagerEmployeeDetails?empid=10001').subscribe(data => {
            this.rowData=data;
      })
    }
    console.log("ds"+this.isHrOut);
    if(this.isHrOut){
      this.columnDefs = [
        { headerName: 'Employee number',field: 'emp_no',sortable: true, filter: true },
        { headerName: 'First Name',field: 'first_name',sortable: true, filter: true },
        { headerName: 'Last Name',field: 'last_name',sortable: true, filter: true},
        { headerName: 'Email',field: 'email',sortable: true, filter: true},
        { headerName: 'Hire Date',field: 'hire_date',sortable: true, filter: true },
        { headerName: 'DOB',field: 'birth_date',sortable: true, filter: true},
        { headerName: 'Gender',field: 'gender',sortable: true, filter: true},
        { headerName: 'Manager',field: 'managername',sortable: true, filter: true},
        { headerName: 'Phone',field: 'phone',sortable: true, filter: true},
        { headerName: 'Department',field: 'department',sortable: true, filter: true}
      ];
      this.http.get<any>('http://oneworkforcesvc-env-1.eba-hf6yw8qp.us-west-1.elasticbeanstalk.com/ONEWORKFORCE/api/getAllEmployeeDetails').subscribe(data => {
            this.rowData=data;
      })
    }
    if(!this.isHrOut&&!this.isManagerOut){
            this.rowData=[{}];
    }
    // this.http.get<any>('http://oneworkforcesvc-env-1.eba-hf6yw8qp.us-west-1.elasticbeanstalk.com/ONEWORKFORCE/api/getManagerEmployeeDetails?empid=10001').subscribe(data => {
    //         this.empOfManager = data.map(function (el) { return el.first_name+" "+el.last_name; });
    // })
  }
  public empSearch() {
    this.http.get<any>('http://oneworkforcesvc-env-1.eba-hf6yw8qp.us-west-1.elasticbeanstalk.com/ONEWORKFORCE/api/getEmployeeSearch?first_name='+this.fName_S+'&last_name='+this.lName_S+'&emp_no='+this.empNumber_S+'&email='+this.email_S+'&phone='+this.phone_S+'&department='+this.department_S).subscribe(data => {
            this.rowData=data;
          //  this.ngOnInit();
      })
  }
  public empSave() {
    this.profileEdit=false;
    let headers = { 'content-type': 'application/json'} ;
    this.profileSaved = true;
    let empSaveObj = {"first_name":this.fName,"last_name":this.lName,"phone":this.phone,"theatre":this.theatre,"email":this.email,"password":"password","address1":this.address1,"address2":this.address2,"city":this.city,"state":this.state,"zip":this.zip,"emp_no":this.employee_number};
    let body=JSON.stringify(empSaveObj);
    this.http.post<any>('http://oneworkforcesvc-env-1.eba-hf6yw8qp.us-west-1.elasticbeanstalk.com/ONEWORKFORCE/api/updateDirectory',body,{'headers':headers}).subscribe(data => {
            this.profileSaved = true;
            this.ngOnInit();
      })
  }
  public empEdit() {
    this.profileEdit=true;
  }

}
