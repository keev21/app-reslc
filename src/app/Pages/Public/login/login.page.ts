import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';

import { PasswordRecoveryPage } from '../password-recovery/password-recovery.page';
import { UserRegisterPage } from '../user-register/user-register.page';
import {AuthService} from '../../../Services/auth.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  USAD_EMAIL: string = '';
  USAD_PASSWORD: string = '';

  constructor(
    public servicio: AuthService,
    public modalCtrl: ModalController,
    public navCtrl: NavController
  ) {}

  ngOnInit() {}
  //----------------login-----------------------------

  
  login() {
    let datos = {
      accion: 'login',
      USAD_EMAIL: this.USAD_EMAIL,
      USAD_PASSWORD: this.USAD_PASSWORD
    }
    this.servicio.postData(datos).subscribe((res:any)=>{
      if(res.estado==true)
      {
    
        this.servicio.showToast(res.mensaje);
        this.navCtrl.navigateRoot(['/home']);
      } else {
        this.servicio.showToast(res.mensaje);
      }
    });
  }

  passwordRecovery() {

    this.navCtrl.navigateForward('password-recovery');
  }
  //DIRECIONANDO AL FORMULARIO DE USER-REGISTER
  createUser() {
    this.navCtrl.navigateForward('user-register');
    

  }
  




}
