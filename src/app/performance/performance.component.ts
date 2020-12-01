import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-performance',
  templateUrl: './performance.component.html',
  styleUrls: ['./performance.component.scss']
})
export class PerformanceComponent implements OnInit {
  @Input() isManagerOut:any;
  constructor() { }

  ngOnInit() {
  }

}
