import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {

  private todo: FormGroup;

  constructor(
    public authServ: AuthService,
    private formBuilder: FormBuilder
  ) {
    this.todo = this.formBuilder.group({
      email: new FormControl('', Validators.compose([Validators.required, Validators.pattern('^(\[a-zA-Z0-9\]+\[a-zA-Z0-9._%\\-\\+\]*@(?:\[a-zA-Z0-9-\]+\\.)+\[a-zA-Z\]{2,4})$')])),
      password: new FormControl('', Validators.compose([Validators.required, Validators.minLength(8)])),
    });
  }

  ngOnInit() {
  }

  logForm() {
    this.authServ.signIn(this.todo.value.email,this.todo.value.password)
    .then(resp => {
      console.log(resp);
    })
  }



}
