import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AngularFireDatabase } from '@angular/fire/database';
import { LogicService } from '../logic.service';

@Component({
  selector: 'app-add-channel',
  templateUrl: './add-channel.page.html',
  styleUrls: ['./add-channel.page.scss'],
})
export class AddChannelPage implements OnInit {
  channels = [];
  constructor(
    public navCtrl: NavController,
    private db: AngularFireDatabase,
    public logic: LogicService
  ) {
    this.db.list('cities').query.on('value', (snap) => {
      let tempObj = snap.val();
      this.channels = Object.keys(tempObj).filter((value, index) => tempObj[value].available === true);
    })
  }

  ngOnInit() {
  }

  goBack() {
    this.navCtrl.navigateBack('');
  }



}
