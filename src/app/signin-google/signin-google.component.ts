import { Component, OnInit,Input } from '@angular/core';
@Component({
  selector: 'app-signin-google',
  templateUrl: './signin-google.component.html',
  styleUrls: ['./signin-google.component.scss']
})
export class SigninGoogleComponent implements OnInit {
  @Input() loggedInUserOut: any;
  @Input() loggedInUserDetailsOut: any;
  @Input() isLoggedInOut: any;
  @Input() isManagerOut:any;
  @Input() isHrOut:any;

  constructor() { }


  ngOnInit() {

  }



}
