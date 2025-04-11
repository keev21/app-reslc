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
  categoria: string = '';
  tipo: string = '1';
  iva: string = '0';
  imagen: string = '';
  stock: string = '0';
  precio: string = '0';
  sucursal: string = '';
  sucursales: any[] = [];
  categorias: any[] = [];
  codigo: string = '';
  imagenPrevia: string | null = null;
  archivoImagen: File | null = null;
  unidad: string = '';
  margen: string = '0';
  precioFinal: number = 0;
  aplicaIva: boolean = false;

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

    this.servicio.getSession('BRAN_CODE').then((res: any) => {
      this.sucursal = res;
      if (this.codigo) {
        this.cargarProducto();
      }
    });
  }

  ngOnInit() {
    this.cargarSucursales1();
    this.cargarCategorias();
  }

  toggleIva() {
    if (!this.aplicaIva) {
      this.iva = '0';
      this.calcularPrecioVenta();
    }
  }

  back() {
    this.navCtrl.back();
  }

  calcularPrecioVenta() {
    const precioBase = parseFloat(this.precio) || 0;
    const ivaPorcentaje = parseFloat(this.iva) || 0;
    const margenPorcentaje = parseFloat(this.margen) || 0;
  
    const precioConIva = precioBase + (precioBase * ivaPorcentaje / 100);
    const precioConMargen = precioConIva + (precioBase * margenPorcentaje / 100);
    this.precioFinal = parseFloat(precioConMargen.toFixed(2));
  }

  getImageUrl(ruta: string): string {
    if (!ruta) return '';
    
    if (ruta.startsWith('data:') || ruta.startsWith('http')) {
      return ruta;
    }
    
    return `${this.servicio.apiUrl}${ruta}`;
  }

  cargarCategorias() {
    let datos = {
      accion: 'cargarCategorys'
    };
    this.servicio.postData(datos).subscribe((res: any) => {
      if (res.estado === true) {
        this.categorias = res.datos;
      } else {
        this.servicio.showToast(res.mensaje);
      }
    });
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
        this.categoria = producto.CAT_CODE;
        this.unidad = producto.INV_UNIT_NAME;
        this.margen = producto.INV_MARGIN;
        this.precioFinal = producto.INV_PRICE_IVA_MARGIN;
        this.aplicaIva = parseFloat(this.iva) > 0;
        this.calcularPrecioVenta();
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
        this.sucursales = res.datos;
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
  
    if (this.tipo == '1') {
      const stockNum = parseInt(this.stock);
      if (isNaN(stockNum) || stockNum < 0) {
        this.servicio.showToast('El stock no puede ser negativo');
        return;
      }
    } else {
      this.stock = '0';
    }
  
    if (!this.precio) {
      this.servicio.showToast('El precio es requerido');
      return;
    }
  
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
      accion: this.codigo ? 'actualizarProducto' : 'guardarProducto',
      codigo: this.codigo,
      nombre: this.nombre,
      tipo: this.tipo,
      iva: this.iva,
      margen: this.margen,
      unidad: this.unidad,
      stock: this.stock,
      precio: this.precio,
      precio_final: this.precioFinal,
      imagen: this.imagen,
      sucursal: this.sucursal,
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