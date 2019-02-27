import { Component, OnInit } from '@angular/core';
import { LogicService } from '../logic.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {

  constructor(
    public logic: LogicService
  ) { }

  ngOnInit() {
  }

}
