import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from '../../../../Services/auth.service';

@Component({
  selector: 'app-edit-admin-branch',
  standalone: false,
  templateUrl: './edit-admin-branch.page.html',
  styleUrls: ['./edit-admin-branch.page.scss'],
})
export class EditAdminBranchPage implements OnInit {
  nombre: string = '';
  ubicacion: string = '';
  estado: string = '';
  codigo: string = '';

  constructor(public navCtrl: NavController, public servicio: AuthService) {
    this.servicio.getSession('codigo').then((res: any) => {
      this.codigo = res;
      if (this.codigo) {
        this.obtenerSucursal();
      }
    });
  }

  ngOnInit() {}

  back() {
    this.navCtrl.back();
  }

  obtenerSucursal() {
    let datos = {
      accion: 'loadbranch',
      codigo: this.codigo
    };
    this.servicio.postData(datos).subscribe(
      (res: any) => {
        if (res.estado === true) {
          let sucursal = res.datos[0];
          this.nombre = sucursal.nombre;
          this.ubicacion = sucursal.ubicacion;
          this.estado = sucursal.estado;
        } else {
          this.servicio.showToast('No se encontró la sucursal');
        }
      },
      (error) => {
        console.error('Error en la solicitud:', error);
      }
    );
  }

  guardar() {
    let datos = {
      accion: this.codigo ? 'ActualizarSucursal' : 'AgregarSucursal',
      codigo: this.codigo || '',
      nombre: this.nombre,
      ubicacion: this.ubicacion,
      estado: this.estado,
    };

    this.servicio.postData(datos).subscribe(
      (res: any) => {
        if (res.estado === true) {
          this.servicio.showToast(this.codigo ? 'Sucursal actualizada correctamente' : 'Sucursal guardada correctamente');
          this.navCtrl.back();
        } else {
          this.servicio.showToast(res.mensaje);
        }
      },
      (error) => {
        console.error('Error en la solicitud:', error);
      }
    );
  }
}
