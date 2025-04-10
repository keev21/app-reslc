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
    if (!this.USAD_EMAIL || !this.USAD_PASSWORD) {
      this.servicio.showToast('Por favor, complete todos los campos.');
      return;
    }

    let datos = {
      accion: 'login',
      email: this.USAD_EMAIL,
      password: this.USAD_PASSWORD
    };

    this.servicio.postData(datos).subscribe((res: any) => {
      if (res.estado === true) {
        // Guardar información del usuario en el almacenamiento local
        this.servicio.createSession('user', JSON.stringify(res.usuario));
        
        // Guardar datos individuales
        this.servicio.createSession('USER_CODE', res.usuario.id);
        this.servicio.createSession('BRAN_CODE', res.usuario.branch);
        this.servicio.createSession('ROL_CODE', res.usuario.rol); // Nuevo: Guardar el rol
        //guardar el rol type
        this.servicio.createSession('ROL_TYPE', res.usuario.rol_type);
        
       
        this.navCtrl.navigateRoot(['/home']);
      } else {
        this.servicio.showToast(res.mensaje);
      }
    }, (error) => {
      this.servicio.showToast('Error en la conexión. Intente nuevamente.');
    });
}

  passwordRecovery() {

    this.navCtrl.navigateForward('admin-categories');
  }
  //DIRECIONANDO AL FORMULARIO DE USER-REGISTER
  createUser() {
    this.navCtrl.navigateForward('user-register');
    

  }
  




}