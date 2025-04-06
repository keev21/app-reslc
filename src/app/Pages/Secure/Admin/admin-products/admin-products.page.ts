import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from '../../../../Services/auth.service';

@Component({
  selector: 'app-admin-products',
  standalone: false,
  templateUrl: './admin-products.page.html',
  styleUrls: ['./admin-products.page.scss'],
})
export class AdminProductsPage implements OnInit {
  Productos: any[] = [];
  nombreProducto: string = '';

  constructor(public servicio: AuthService, public navCtrl: NavController) {}

  ngOnInit() {
    this.obtenerProductos();
  }

  // Buscar productos
  buscarProductos() {
    let datos = {
      accion: 'consultProductos',
      nombreProducto: this.nombreProducto,
    };
    this.servicio.postData(datos).subscribe((res: any) => {
      if (res.estado === true) {
        this.Productos = res.datos;
      } else {
        this.servicio.showToast(res.mensaje);
      }
    });
  }

  // Obtener todos los productos
  obtenerProductos() {
    let datos = {
      accion: 'consultProductos',
    };
    this.servicio.postData(datos).subscribe(
      (res: any) => {
        console.log(res);
        if (res.estado === true) {
          this.Productos = res.datos;
        } else {
          this.servicio.showToast(res.mensaje);
        }
      },
      (error) => {
        console.error('Error en la solicitud:', error);
      }
    );
  }

  // Ir a la página de nuevo producto
  nuevo() {
    this.servicio.createSession('codigo', '');
    this.navCtrl.navigateRoot(['edit-admin-products']);
  }

  // Ir a la página de editar producto
  irEditar(codigo: string) {
    this.servicio.createSession('codigo', codigo);
    this.navCtrl.navigateRoot(['edit-admin-products']);
  }

  // Manejar URLs de imagen
  getImageUrl(ruta: string): string {
    if (!ruta) return '';
    
    if (ruta.startsWith('data:') || ruta.startsWith('http')) {
      return ruta;
    }
    
    return `${this.servicio.apiUrl}${ruta}`;
  }

  // Eliminar producto
  eliminar(codigo?: string) {
    if (codigo) {
      let datos = {
        accion: 'elProduct',
        codigo: codigo,
      };
      console.log(datos);
      this.servicio.postData(datos).subscribe(
        (res: any) => {
          if (res.estado === true) {
            this.servicio.showToast('Producto eliminado correctamente');
            this.obtenerProductos();
          } else {
            this.servicio.showToast(res.mensaje);
          }
        },
        (error) => {
          console.error('Error en la solicitud:', error);
        }
      );
    } else {
      this.servicio.showToast('Código del producto no encontrado');
    }
  }

  // Regresar al menú
  cancelar() {
    this.navCtrl.back();
  }
}