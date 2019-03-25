import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  todo: FormGroup;

  constructor(
    public authServ: AuthService,
    private formBuilder: FormBuilder,
    private navCtrl: NavController
  ) {
    this.todo = this.formBuilder.group({
      name: new FormControl('', Validators.compose([Validators.required, Validators.maxLength(12)])),
      email: new FormControl('', Validators.compose([Validators.required, Validators.pattern('^(\[a-zA-Z0-9\]+\[a-zA-Z0-9._%\\-\\+\]*@(?:\[a-zA-Z0-9-\]+\\.)+\[a-zA-Z\]{2,4})$')])),
      password: new FormControl('', Validators.compose([Validators.required, Validators.minLength(8)])),
    });
  }

  ngOnInit() {
  }

  logForm() {
    this.authServ.signUp(this.todo.value.email, this.todo.value.password, this.todo.value.name)
     
  }

  goBack() {
    this.navCtrl.back();
  }

}
