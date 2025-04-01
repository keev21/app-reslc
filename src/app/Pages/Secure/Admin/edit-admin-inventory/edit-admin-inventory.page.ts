import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from '../../../../Services/auth.service';

@Component({
  selector: 'app-edit-admin-inventory',
  standalone: false,
  templateUrl: './edit-admin-inventory.page.html',
  styleUrls: ['./edit-admin-inventory.page.scss'],
})
export class EditAdminInventoryPage implements OnInit {
  nombre: string = '';
  tipo: string = '1';
  iva: string = '0';
  imagen: string = '';
  stock: string = '0';
  precio: string = '0';
  sucursal: string = '';
  sucursales: any[] = [];
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
    this.cargarSucursales1();
  }

  back() {
    this.navCtrl.back();
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

  cargarProducto() {
    let datos = {
      accion: 'loadProducto',
      codigo: this.codigo
    };
    
    this.servicio.postData(datos).subscribe((res: any) => {
      if (res.estado === true) {
        const producto = res.datos;
        this.nombre = producto.INV_NAME;
        this.tipo = producto.INV_TYPE;
        this.iva = producto.INV_IVA;
        this.imagen = producto.INV_IMAGE;
        this.stock = producto.INV_STOCK;
        this.precio = producto.INV_PRICE;
        this.sucursal = producto.BRAN_CODE;
      } else {
        this.servicio.showToast(res.mensaje);
      }
    });
  }

 
  cargarSucursales1() {
    let datos = {
      "accion": "cargarSucursales1",
    }
    this.servicio.postData(datos).subscribe((res: any) => {
      if (res.estado == true) {
        this.sucursales = res.datos;  // Guarda los datos de las sedes
        console.log("los datos son",this.sucursales);
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
  
    if (this.tipo == '1' && !this.stock) {
      this.servicio.showToast('El stock es requerido para productos');
      return;
    }
  
    if (!this.precio) {
      this.servicio.showToast('El precio es requerido');
      return;
    }
  
    // Subir imagen si es que se ha seleccionado una nueva
    if (this.archivoImagen) {
      this.servicio.uploadImage(this.archivoImagen).subscribe(
        (res: any) => {
          if (res.estado) {
            // Guardamos la ruta de la imagen en la base de datos
            this.imagen = res.rutaImagen; // Asume que la respuesta incluye la ruta de la imagen subida
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
      this.guardarProducto(); // Si no hay imagen, se guarda el producto sin ella
    }
  }
  
  guardarProducto() {
    let datos = {
      accion: this.codigo ? 'ActualizarProducto' : 'AgregarProducto',
      codigo: this.codigo || '',
      nombre: this.nombre,
      tipo: this.tipo,
      iva: this.iva,
      imagen: this.imagen,
      stock: this.stock,
      precio: this.precio,
      sucursal: this.sucursal
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