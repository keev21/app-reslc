import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';
import { NavController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-admin-order-products',
  standalone: false,
  templateUrl: './admin-order-products.page.html',
  styleUrls: ['./admin-order-products.page.scss'],
})
export class AdminOrderProductsPage implements OnInit {
  ORD_CODE: string = '';
  products: any[] = [];
  categories: any[] = [];
  searchTerm: string = '';
  selectedCategory: string = 'all';
  loading: boolean = true;

  constructor(
    private authService: AuthService,
    private navCtrl: NavController,
    private alertController: AlertController
  ) {
    this.authService.getSession('ORD_CODE').then((res: any) => {
      this.ORD_CODE = res;
    });
  }

  async ngOnInit() {
    await this.loadCategories();
    await this.loadProducts();
  }

  getProductImage(imagePath: string): string {
    if (!imagePath) {
      return 'assets/images/default-product.png';
    }
    
    if (imagePath.startsWith('data:image') || imagePath.startsWith('http')) {
      return imagePath;
    }
    
    return `${this.authService.apiUrl}${imagePath}`;
  }

  async loadCategories() {
    const datos = {
      accion: 'getCategories'
    };
    
    this.authService.postData(datos).subscribe((res: any) => {
      if (res.estado === true) {
        this.categories = res.categories;
        this.categories.unshift({ CAT_CODE: 'all', CAT_NAME: 'Todas las categorías' });
      }
    });
  }

  async loadProducts() {
    this.loading = true;
    const datos = {
      accion: 'getInventoryProducts',
      searchTerm: this.searchTerm,
      category: this.selectedCategory === 'all' ? null : this.selectedCategory
    };
    
    this.authService.postData(datos).subscribe((res: any) => {
      this.loading = false;
      if (res.estado === true) {
        this.products = res.products;
      }
    });
  }

  onSearchChange(event: any) {
    this.searchTerm = event.detail.value;
    this.loadProducts();
  }

  onCategoryChange() {
    this.loadProducts();
  }
  async selectProduct(product: any) {
    // Primero verificamos si el producto ya existe en la orden
    const datos = {
      accion: 'checkProductInOrder',
      ORD_CODE: this.ORD_CODE,
      INV_CODE: product.INV_CODE
    };
    
    try {
      const checkResponse: any = await this.authService.postData(datos).toPromise();
      
      if (checkResponse.estado === true && checkResponse.existe) {
        // Producto ya existe en la orden
        const alert = await this.alertController.create({
          header: 'Advertencia',
          message: 'Este producto ya fue agregado anteriormente a la orden.',
          buttons: ['OK']
        });
        await alert.present();
        return;
      }
      
      // Si no existe, mostramos el alert para ingresar la cantidad
      const quantityAlert = await this.alertController.create({
        header: 'Agregar Producto',
        message: `Ingrese la cantidad para ${product.INV_NAME}`,
        inputs: [
          {
            name: 'quantity',
            type: 'number',
            placeholder: 'Cantidad',
            min: '1',
            value: '1' // Valor por defecto
          }
        ],
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            cssClass: 'secondary'
          },
          {
            text: 'Continuar',
            handler: (data) => {
              return new Promise<boolean>(async (resolve) => {
                if (!data.quantity || data.quantity <= 0) {
                  // Mostrar error si la cantidad no es válida
                  const errorAlert = await this.alertController.create({
                    header: 'Error',
                    message: 'Por favor ingrese una cantidad válida',
                    buttons: ['OK']
                  });
                  await errorAlert.present();
                  resolve(false); // Evita que se cierre el alert
                  return;
                }
                
                try {
                  // Procedemos a agregar el producto con la cantidad especificada
                  const addDatos = {
                    accion: 'addProductToOrder',
                    ORD_CODE: this.ORD_CODE,
                    INV_CODE: product.INV_CODE,
                    ORDD_QUANTITY: data.quantity,
                    ORDD_PRICE: product.INV_PRICE_IVA_MARGIN,
                    ORDD_NOTES: ''
                  };
                  
                  const addResponse: any = await this.authService.postData(addDatos).toPromise();
                  
                  if (addResponse.estado === true) {
                    // Guardamos el código del detalle de orden en la sesión
                    await this.authService.createSession('ORDD_CODE', addResponse.ORDD_CODE);
                    
                    // Mostramos mensaje de éxito
                    const successAlert = await this.alertController.create({
                      header: 'Éxito',
                      message: 'Producto agregado correctamente a la orden.',
                      buttons: ['OK']
                    });
                    await successAlert.present();
                    
                    // Redirigimos a admin-order después de agregar
                    this.navCtrl.navigateForward('/admin-order');
                    resolve(true); // Cierra el alert
                  } else {
                    throw new Error(addResponse.mensaje || 'Error al agregar el producto');
                  }
                } catch (error) {
                  const errorAlert = await this.alertController.create({
                    header: 'Error',
                    message: 'Ocurrió un error al agregar el producto: ',
                    buttons: ['OK']
                  });
                  await errorAlert.present();
                  resolve(false); // Evita que se cierre el alert
                }
              });
            }
          }
        ]
      });
      
      await quantityAlert.present();
      
    } catch (error) {
      const errorAlert = await this.alertController.create({
        header: 'Error',
        message: 'Ocurrió un error al verificar el producto: ',
        buttons: ['OK']
      });
      await errorAlert.present();
    }
  }
 

  goBack() {
    this.navCtrl.back();
  }
}