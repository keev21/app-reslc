import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from '../../../../Services/auth.service';

@Component({
  selector: 'app-admin-branch',
  standalone: false,
  templateUrl: './admin-branch.page.html',
  styleUrls: ['./admin-branch.page.scss'],
})
export class AdminBranchPage implements OnInit {
  Sucursales: any[] = [];
  nombreSucursal: string = '';

  constructor(public servicio: AuthService, public navCtrl: NavController) {}

  ngOnInit() {
    this.obtenerSucursales();
  }

  // Buscar sucursales
  buscarSucursales() {
    let datos = {
      accion: 'consultarSucursales',
      nombreSucursal: this.nombreSucursal,
    };
    this.servicio.postData(datos).subscribe((res: any) => {
      if (res.estado === true) {
        this.Sucursales = res.datos;
      } else {
        this.servicio.showToast(res.mensaje);
      }
    });
  }

  // Obtener todas las sucursales
  obtenerSucursales() {
    let datos = {
      accion: 'consultarSucursales',
    };
    this.servicio.postData(datos).subscribe(
      (res: any) => {
        console.log(res);
        if (res.estado === true) {
          this.Sucursales = res.datos;
        } else {
          this.servicio.showToast(res.mensaje);
        }
      },
      (error) => {
        console.error('Error en la solicitud:', error);
      }
    );
  }

  // Ir a la página de nueva sucursal
  nuevo() {
    this.servicio.createSession('codigo', '');
    this.navCtrl.navigateRoot(['edit-admin-branch']);
  }

  // Ir a la página de editar sucursal
  irEditar(codigo: string) {
    this.servicio.createSession('codigo', codigo);
    this.navCtrl.navigateRoot(['edit-admin-branch']);
  }

  // Eliminar sucursal
  eliminar(codigo?: string) {
    if (codigo) {
      let datos = {
        accion: 'eliminarSucursal',
        codigo: codigo,
      };
      console.log(datos);
      this.servicio.postData(datos).subscribe(
        (res: any) => {
          if (res.estado === true) {
            this.servicio.showToast('Sucursal eliminada correctamente');
            this.obtenerSucursales();
          } else {
            this.servicio.showToast(res.mensaje);
          }
        },
        (error) => {
          console.error('Error en la solicitud:', error);
        }
      );
    } else {
      this.servicio.showToast('Código de la sucursal no encontrado');
    }
  }

  // Regresar al menú
  cancelar() {
    this.navCtrl.back();
  }
}
