import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  userInfo: any;
  constructor(
    public auth: AuthService
  ) {
    this.userInfo = JSON.parse(localStorage.getItem('userInfo'))
  }
}
