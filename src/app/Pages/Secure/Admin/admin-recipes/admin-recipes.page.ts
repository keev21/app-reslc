import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from '../../../../Services/auth.service';

@Component({
  selector: 'app-admin-recipes',
  standalone: false,
  templateUrl: './admin-recipes.page.html',
  styleUrls: ['./admin-recipes.page.scss'],
})
export class AdminRecipesPage implements OnInit {
  recetas: any[] = [];
  buscarCodigo: string = '';

  constructor(private servicio: AuthService, private navCtrl: NavController) {}

  ngOnInit() {
    this.obtenerRecetas();
  }

  

  obtenerRecetas() {
    let datos = {
      accion: 'consultarRecetas',
    };
    this.servicio.postData(datos).subscribe(
      (res: any) => {
        console.log(res); // Agrega este log para ver la respuesta
        if (res.estado === true) {
          console.log(res.datos); // Agrega este log para ver la respuesta
          this.recetas = res.datos;
        } else {
          this.servicio.showToast(res.mensaje);
        }
      },
      (error) => {
        console.error('Error en la solicitud:', error);
      }
    );
  }


  buscarRecetas() {
    this.servicio.postData({
      accion: 'consultarRecetas',
      codigoProducto: this.buscarCodigo,
    }).subscribe((res: any) => {
      if (res.estado) {
        this.recetas = res.datos;
      } else {
        this.servicio.showToast(res.mensaje);
      }
    });
  }

  nuevo() {
    this.servicio.createSession('codigoReceta', '');
    this.navCtrl.navigateRoot(['edit-admin-recipes']);
  }

  irEditar(codigo: string) {
    this.servicio.createSession('codigoReceta', codigo);
    this.navCtrl.navigateRoot(['edit-admin-recipes']);
  }

  eliminar(codigo: string) {
    this.servicio.postData({
      accion: 'eliminarReceta',
      codigo: codigo,
    }).subscribe((res: any) => {
      if (res.estado) {
        this.servicio.showToast('Receta eliminada');
        this.obtenerRecetas();
      } else {
        this.servicio.showToast(res.mensaje);
      }
    });
  }

  cancelar() {
    this.navCtrl.back();
  }
}
