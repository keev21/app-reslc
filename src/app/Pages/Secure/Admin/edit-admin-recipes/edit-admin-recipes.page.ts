import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from '../../../../Services/auth.service';

@Component({
  selector: 'app-edit-admin-recipes',
  standalone: false,
  templateUrl: './edit-admin-recipes.page.html',
  styleUrls: ['./edit-admin-recipes.page.scss'],
})
export class EditAdminRecipesPage implements OnInit {
  productos: any[] = [];
  producto: string = '';
  estado: string = '';
  codigo: string = '';
  textoBuscar: string = '';
  productosFiltrados: any[] = [];
  constructor(
    public navCtrl: NavController,
    public servicio: AuthService
  ) {
    this.servicio.getSession('codigoReceta').then((res: any) => {
      this.codigo = res;
      //console.log("el codigo que llega es:",this.codigo);
      if (this.codigo) {
        this.obtenerReceta();
      }
    });
  }

  ngOnInit() {
    this.cargarProductos();
  }

  back() {
    this.navCtrl.back();
  }

  cargarProductos() {
    const datos = {
      accion: 'loadproductoss'
    };
    this.servicio.postData(datos).subscribe((res: any) => {
      if (res.estado) {
        this.productos = res.datos;
        this.productosFiltrados = [...this.productos]; // Copia inicial
      } else {
        this.servicio.showToast(res.mensaje);
      }
    });
  }
  
  filtrarProductos() {
    const texto = this.textoBuscar.toLowerCase();
    this.productosFiltrados = this.productos.filter(prod =>
      prod.PRO_NAME.toLowerCase().includes(texto)
    );
  }


  obtenerReceta() {
    const datos = {
      accion: 'loadreceta',
      codigo: this.codigo
    };
    this.servicio.postData(datos).subscribe((res: any) => {
      if (res.estado) {
        const receta = res.datos[0];
        this.producto = receta.PRO_CODE;
        this.estado = receta.REC_STATUS;
      } else {
        this.servicio.showToast('No se encontró la receta');
      }
    });
  }

  guardar() {
    const datos = {
      accion: this.codigo ? 'actualizarreceta' : 'agregarreceta',
      codigo: this.codigo || '',
      producto: this.producto,
      estado: this.estado
    };

    this.servicio.postData(datos).subscribe((res: any) => {
      if (res.estado) {
        this.servicio.showToast(this.codigo ? 'Receta actualizada' : 'Receta guardada');
        this.navCtrl.back();
      } else {
        this.servicio.showToast(res.mensaje);
      }
    });
  }
}


