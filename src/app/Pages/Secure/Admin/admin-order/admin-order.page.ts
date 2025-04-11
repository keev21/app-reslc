import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-admin-order',
  standalone: false,
  templateUrl: './admin-order.page.html',
  styleUrls: ['./admin-order.page.scss'],
})
export class AdminOrderPage implements OnInit {
  order: any = {
    ORD_CODE: '',
    ORD_DATE: '',
    ORD_TOTAL: 0,
    BOO_CODE: ''
  };
  
  orderDetails: any[] = [];

  constructor(
    private authService: AuthService,
    private alertController: AlertController,
    private navCtrl: NavController
  ) { }

  async ngOnInit() {
    await this.loadOrderData();
    await this.loadOrderDetails();
  }

  async loadOrderData() {
    const ordCode = await this.authService.getSession('ORD_CODE');
    const booCode = await this.authService.getSession('BOO_CODE');
    
    if (ordCode && booCode) {
      const datos = {
        accion: 'getOrderDetails',
        ord_code: ordCode,
        boo_code: booCode
      };
      
      this.authService.postData(datos).subscribe((res: any) => {
        if (res.estado === true) {
          this.order = res.order;
          if (this.order.ORD_DATE) {
            this.order.ORD_DATE = new Date(this.order.ORD_DATE).toLocaleString();
          }
        } else {
          this.authService.showToast(res.mensaje || 'Error al cargar la orden');
        }
      });
    } else {
      this.authService.showToast('No se encontró información de la orden');
      this.navCtrl.navigateBack('/admin-booking');
    }
  }

  async loadOrderDetails() {
    const ordCode = await this.authService.getSession('ORD_CODE');
    
    if (ordCode) {
      const datos = {
        accion: 'getOrderProducts',
        ord_code: ordCode
      };
      
      this.authService.postData(datos).subscribe((res: any) => {
        if (res.estado === true) {
          this.orderDetails = res.orderDetails;
        } else {
          this.authService.showToast(res.mensaje || 'Error al cargar los productos de la orden');
        }
      });
    }
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

  async deleteProduct(orddCode: string) {
    const alert = await this.alertController.create({
      header: 'Confirmar eliminación',
      message: '¿Estás seguro de que deseas eliminar este producto de la orden?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Eliminar',
          handler: () => {
            this.confirmDeleteProduct(orddCode);
          }
        }
      ]
    });

    await alert.present();
  }

  async confirmDeleteProduct(orddCode: string) {
    const datos = {
      accion: 'deleteProductFromOrder',
      ordd_code: orddCode
    };
    
    this.authService.postData(datos).subscribe(async (res: any) => {
      if (res.estado === true) {
        this.authService.showToast('Producto eliminado correctamente');
        await this.loadOrderDetails();
        await this.loadOrderData(); // Para actualizar el total
      } else {
        this.authService.showToast(res.mensaje || 'Error al eliminar el producto');
      }
    });
  }

  async addProducts() {
    this.navCtrl.navigateForward('/admin-order-products');
  }

  async makePayment() {
    const alert = await this.alertController.create({
      header: 'Confirmar pago',
      message: '¿Desea realizar el pago de esta orden?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Sí',
          handler: () => {
            this.navCtrl.navigateForward('/admin-payment');
          }
        }
      ]
    });

    await alert.present();
  }
}