import { Component, OnInit } from '@angular/core';
import { APP_INFO } from 'src/app/shared/service/app-info.enum';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit {

  public appInfo = APP_INFO;  

  constructor() { }

  ngOnInit(): void {
  }

}
