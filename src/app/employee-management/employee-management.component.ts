import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-employee-management',
  templateUrl: './employee-management.component.html',
  styleUrls: ['./employee-management.component.scss']
})
export class EmployeeManagementComponent implements OnInit {
  @Input() isManagerOut:any;
  employeeManagementHome:boolean;
  clickedContent:any;
  constructor() { }
  public fnClickedContent(contentClicked : string){
    if(contentClicked=="directory"){
      this.clickedContent="Directory";
      this.employeeManagementHome=false;
    }
    else if(contentClicked=="leave"){
      this.clickedContent="Leave";
      this.employeeManagementHome=false;
    }
    else if(contentClicked=="claim"){
      this.clickedContent="Claim";
      this.employeeManagementHome=false;
    }
    else if(contentClicked=="performance"){
      this.clickedContent="performance";
      this.employeeManagementHome=false;
    }
    else{
      this.clickedContent="";
      this.employeeManagementHome=true;
    }
  }

  ngOnInit() {
    this.employeeManagementHome=true;
  }

}
