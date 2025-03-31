import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from '../../../../Services/auth.service';

@Component({
  selector: 'app-admin-inventory',
  standalone: false,
  templateUrl: './admin-inventory.page.html',
  styleUrls: ['./admin-inventory.page.scss'],
})
export class AdminInventoryPage implements OnInit {
  Productos: any[] = [];
  nombreProducto: string = '';

  constructor(public servicio: AuthService, public navCtrl: NavController) {}

  ngOnInit() {
    this.obtenerProductos();
  }

  // Buscar productos
  buscarProductos() {
    let datos = {
      accion: 'consultarProductos',
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
      accion: 'consultarProductos',
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
    this.navCtrl.navigateRoot(['edit-admin-inventory']);
  }

  // Ir a la página de editar producto
  irEditar(codigo: string) {
    this.servicio.createSession('codigo', codigo);
    this.navCtrl.navigateRoot(['edit-admin-inventory']);
  }

   // Añade esta función para manejar las URLs de imagen
   getImageUrl(ruta: string): string {
    if (!ruta) return '';
    
    // Si es una vista previa (base64) o URL completa
    if (ruta.startsWith('data:') || ruta.startsWith('http')) {
      return ruta;
    }
    
    // Si es una ruta relativa del servidor
    return `${this.servicio.apiUrl}${ruta}`;
  }

  // Eliminar producto
  eliminar(codigo?: string) {
    if (codigo) {
      let datos = {
        accion: 'eliminarProducto',
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