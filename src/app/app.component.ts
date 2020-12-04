import { Component, Inject, OnInit,Output} from '@angular/core';
import { HttpClient } from '@angular/common/http';
// Import the AuthService type from the SDK
import { AuthService } from '@auth0/auth0-angular';
import { DOCUMENT } from '@angular/common';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'One Work Force';
  isLoggedIn :boolean;
  loggedInUserDetails=""
  loggedInUser = ""
  isManager:boolean;
  isHr:boolean;
  employee_number:any;
  constructor(private http: HttpClient,public auth: AuthService,@Inject(DOCUMENT) public document: Document) { }
  public auth0LoginOneWorkForce() {
    this.auth.loginWithRedirect()
  }
  ngOnInit() {
    this.auth.isAuthenticated$.subscribe(result=>{
      console.log("logged In ->"+JSON.stringify(result));
      if(!result){
          this.isLoggedIn=false;
          this.loggedInUser="Log In";
          this.loggedInUserDetails="";
      }
      else{
          this.auth.user$.subscribe(result=>{
          this.isLoggedIn=true;
          this.loggedInUser=result.nickname;
          this.loggedInUserDetails="Signed in As '"+result.nickname +"' using '"+result.name+"'";
          //var emplIdTemp;
          // if(result.name=='raghavadevaraje.urs@sjsu.edu'){
          //   this.employee_number=10001;
          //   emplIdTemp = 10001;
          //   this.isManager=true;
          // }
          // else if(result.name=='varunselvakumar90@gmail.com'){
          //   this.employee_number=10004;
          //   emplIdTemp = 10004;
          //   this.isHr=true;
          // }
          // else {
          //   this.employee_number=10003;
          //   emplIdTemp = 10003;
          //   this.isManager=false;
          // }
          this.http.get<any>('http://ec2-52-53-164-188.us-west-1.compute.amazonaws.com:8080/ONEWORKFORCE/api/getEmployeeDetails?empid='+result.name).subscribe(data => {
              this.employee_number = data[0].emp_no;
              var isManager = data[0].managerflag;
              var hrFlag = data[0].hrflag
              if(isManager=='Y'){
              this.isManager=true;
              }
              else{
                this.isManager=false;
              }
              if(hrFlag=='Y'){
                this.isHr=true;
              }
              else{
                this.isHr=false;
              }
          })
          // this.http.get<any>('http://localhost:4200/api').subscribe(data => {
          //     var isManager = data[0].managerflag;
          //     if(isManager=='Y'){
          //     this.isManager=true;
          //     }
          //     else{
          //       this.isManager=false;
          //     }
          // })
          
          });
          }
    });
  }
 
}
