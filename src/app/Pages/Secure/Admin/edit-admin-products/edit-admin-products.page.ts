import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from '../../../../Services/auth.service';

@Component({
  selector: 'app-edit-admin-products',
  standalone: false,
  templateUrl: './edit-admin-products.page.html',
  styleUrls: ['./edit-admin-products.page.scss'],
})
export class EditAdminProductsPage implements OnInit {
  nombre: string = '';
  precio: number = 0;
  imagen: string = '';
  cantidad: number = 0;
  estado: string = '';
  descripcion: string = '';
  categoria: string = '';
  categorias: any[] = [];
  codigo: string = '';
  imagenPrevia: string | null = null;
  archivoImagen: File | null = null;

  constructor(
    public navCtrl: NavController,
    public servicio: AuthService
  ) { 
    this.servicio.getSession('codigo').then((res: any) => {
      this.codigo = res;
      if (this.codigo) {
        this.cargarProducto();
      }
    });
  }

  ngOnInit() {
    this.cargarCategorias();
  }

  back() {
    this.navCtrl.back();
  }

  getImageUrl(ruta: string): string {
    if (!ruta) return '';
    
    if (ruta.startsWith('data:') || ruta.startsWith('http')) {
      return ruta;
    }
    
    return `${this.servicio.apiUrl}${ruta}`;
  }

  cargarProducto() {
    let datos = {
      accion: 'loadProducts',
      codigo: this.codigo
    };
    
    this.servicio.postData(datos).subscribe((res: any) => {
      if (res.estado === true) {
        const producto = res.datos;
        this.nombre = producto.PRO_NAME;
        this.precio = producto.PRO_PRICE;
        this.imagen = producto.PRO_IMAGE;
        this.cantidad = producto.PRO_QUANTY;
        this.estado = producto.PRO_STATE;
        this.descripcion = producto.PRO_DESCRIPTION;
        this.categoria = producto.CAT_CODE;
      } else {
        this.servicio.showToast(res.mensaje);
      }
    });
  }

  cargarCategorias() {
    let datos = {
      accion: 'cargarCategory'
    };
    this.servicio.postData(datos).subscribe((res: any) => {
      if (res.estado === true) {
        this.categorias = res.datos;
      } else {
        this.servicio.showToast(res.mensaje);
      }
    });
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      if (!file.type.match('image.*')) {
        this.servicio.showToast('Solo se permiten imágenes');
        return;
      }
      
      if (file.size > 2 * 1024 * 1024) {
        this.servicio.showToast('La imagen no debe superar los 2MB');
        return;
      }
      
      this.archivoImagen = file;
      
      const reader = new FileReader();
      reader.onload = () => {
        this.imagenPrevia = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  eliminarImagen() {
    this.imagenPrevia = null;
    this.archivoImagen = null;
    this.imagen = '';
  }

  guardar() {
    if (!this.nombre) {
      this.servicio.showToast('El nombre del producto es requerido');
      return;
    }
  
    if (this.precio <= 0) {
      this.servicio.showToast('El precio debe ser mayor a cero');
      return;
    }
  
    if (!this.categoria) {
      this.servicio.showToast('Debe seleccionar una categoría');
      return;
    }
  
    // Subir imagen si es que se ha seleccionado una nueva
    if (this.archivoImagen) {
      this.servicio.uploadImage(this.archivoImagen).subscribe(
        (res: any) => {
          if (res.estado) {
            this.imagen = res.rutaImagen;
            this.guardarProducto();
          } else {
            this.servicio.showToast('Error al subir la imagen');
          }
        },
        (error) => {
          this.servicio.showToast('Error de conexión');
        }
      );
    } else {
      this.guardarProducto();
    }
  }
  
  guardarProducto() {
    let datos = {
      accion: this.codigo ? 'ActProducts' : 'AgProducts',
      codigo: this.codigo || '',
      nombre: this.nombre,
      precio: this.precio,
      imagen: this.imagen,
      cantidad: this.cantidad,
      estado: this.estado,
      descripcion: this.descripcion,
      categoria: this.categoria
    };
  
    this.servicio.postData(datos).subscribe((res: any) => {
      if (res.estado === true) {
        this.servicio.showToast(res.mensaje);
        this.navCtrl.back();
      } else {
        this.servicio.showToast(res.mensaje);
      }
    });
  }
}