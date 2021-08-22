import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit {

  public sideBarOpen: boolean = false;

  constructor() { }

  ngOnInit(): void { }

  public sideBarToggler(value: any) {
    this.sideBarOpen = !this.sideBarOpen;
  }

}
