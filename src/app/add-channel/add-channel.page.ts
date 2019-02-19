import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-add-channel',
  templateUrl: './add-channel.page.html',
  styleUrls: ['./add-channel.page.scss'],
})
export class AddChannelPage implements OnInit {
channels = [];
  constructor(
    public navCtrl: NavController,
    private db: AngularFireDatabase
    ) {
this.db.list('cities').query.on('value', (snap)=>{
  let temp = snap.val()
  this.channels = Object.keys(temp).map( i => temp[i].name);
})
   }

  ngOnInit() {
  }

  goBack() {
    this.navCtrl.navigateBack('');
  }



}
