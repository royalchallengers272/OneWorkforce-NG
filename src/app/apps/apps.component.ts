import { Component, OnInit,Input } from '@angular/core';


@Component({
  selector: 'app-apps',
  templateUrl: './apps.component.html',
  styleUrls: ['./apps.component.scss']
})
export class AppsComponent implements OnInit {
  @Input() isManagerOut:any;
  @Input() isHrOut:any;
  constructor() { }
  ngOnInit() {
  }

}
