import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { LogicService } from '../logic.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  constructor(
    public auth: AuthService,
    public logic: LogicService
  ){}
}
