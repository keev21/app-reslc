import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from '../../../../Services/auth.service';

@Component({
  selector: 'app-admin-floors',
  standalone: false,
  templateUrl: './admin-floors.page.html',
  styleUrls: ['./admin-floors.page.scss'],
})
export class AdminFloorsPage implements OnInit {
  Pisos: any[] = [];
  nombrePiso: string = '';
  constructor(public servicio: AuthService, public navCtrl: NavController) {}

  ngOnInit() {
    this.obtenerPisos();
  }
//BUSCAR EMPRESA
buscarPisos() {
  let datos = {
    accion: 'consultarPisos',
    nombrePiso: this.nombrePiso,
  };
  this.servicio.postData(datos).subscribe((res: any) => {
    if (res.estado === true) {
      this.Pisos = res.datos;
    } else {
      this.servicio.showToast(res.mensaje);
    }
  });
}

  obtenerPisos() {
    let datos = {
      accion: 'consultarPisos',
    };
    this.servicio.postData(datos).subscribe(
      (res: any) => {
        console.log(res); // Agrega este log para ver la respuesta
        if (res.estado === true) {
          console.log(res.datos); // Agrega este log para ver la respuesta
          this.Pisos = res.datos;
        } else {
          this.servicio.showToast(res.mensaje);
        }
      },
      (error) => {
        console.error('Error en la solicitud:', error);
      }
    );
  }

  nuevo() {
    // this.authService.closeSession('codigo');
    // this.navCtrl.navigateRoot(['edit-business-information']);
    this.servicio.createSession('codigo','');
    this.navCtrl.navigateRoot(['edit-admin-floors']);
  }

  //IR A EDITAR EN EL CAMPO DE EDITAR EMPRESA
  irEditar(codigo: string) {
    this.servicio.createSession('codigo', codigo);
    this.navCtrl.navigateRoot(['edit-admin-floors']);
  }

  //FUNCION PARA ELIMINAR EMPRESA
  eliminar(codigo?: string) {
    if (codigo) {
      let datos = {
        accion: 'eliminarPiso',
        codigo: codigo,
      };
      console.log(datos);
      this.servicio.postData(datos).subscribe(
        (res: any) => {
          if (res.estado === true) {
            this.servicio.showToast('Piso eliminado correctamente');
            this.obtenerPisos();
          } else {
            this.servicio.showToast(res.mensaje);
          }
        },
        (error) => {
          console.error('Error en la solicitud:', error);
        }
      );
    } else {
      this.servicio.showToast('Código del Empresa no encontrado');
    }
  }

  //REGRESO AL MENU
  cancelar() {
    this.navCtrl.back();
  }

}
