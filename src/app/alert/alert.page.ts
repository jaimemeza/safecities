import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';
import { LogicService } from '../logic.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.page.html',
  styleUrls: ['./alert.page.scss'],
})
export class AlertPage implements OnInit {

  constructor(
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private storage: Storage,
    private logic: LogicService
  ) { }

  ngOnInit() {
    let city = this.route.snapshot.paramMap.get('id');
    console.log(city);
    this.storage.get(city)
      .then(alerts => {
        if (alerts) {
          this.logic.alerts = alerts;
        }
      })
  }
  goBack() {
    this.navCtrl.back();
  }

}
