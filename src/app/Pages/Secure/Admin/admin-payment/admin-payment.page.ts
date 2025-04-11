import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../Services/auth.service';
import { NavController, AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-admin-payment',
  standalone: false,
  templateUrl: './admin-payment.page.html',
  styleUrls: ['./admin-payment.page.scss'],
})
export class AdminPaymentPage implements OnInit {
  ORD_CODE: string = "";
  total: number = 0;
  paymentMethod: string = 'efectivo';
  transferId: string = '';
  imageFile: File | null = null;
  imagePreview: string | null = null;
  loading: boolean = true;

  constructor(
    private servicio: AuthService,
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController
  ) {
    this.servicio.getSession('ORD_CODE').then((res: any) => {
      this.ORD_CODE = res;
      console.log('ORD_CODE:', this.ORD_CODE);
      this.loadOrderTotal();
    });
  }

  ngOnInit() {}

  async loadOrderTotal() {
    const datos = {
      accion: 'getOrderTotal',
      ORD_CODE: this.ORD_CODE
    };
    
    this.servicio.postData(datos).subscribe(async (res: any) => {
      this.loading = false;
      if (res.estado === true) {
        // Asegúrate de que el total es un número, incluso si es 0
        this.total = res.total ? parseFloat(res.total) : 0;
      } else {
        const alert = await this.alertCtrl.create({
          header: 'Error',
          message: 'No se pudo cargar el total de la orden',
          buttons: ['OK']
        });
        await alert.present();
      }
    });
  }

  paymentMethodChanged() {
    if (this.paymentMethod === 'efectivo') {
      this.transferId = '';
      this.imageFile = null;
      this.imagePreview = null;
    }
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
      
      this.imageFile = file;
      
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  removeImage() {
    this.imageFile = null;
    this.imagePreview = null;
  }

  canCompletePayment(): boolean {
    if (this.paymentMethod === 'transferencia') {
      return !!this.transferId && !!this.imageFile;
    }
    return true;
  }

  async completePayment() {
    const loading = await this.loadingCtrl.create({
      message: 'Procesando pago y actualizando inventario...'
    });
    await loading.present();

    try {
      // Subir imagen si es transferencia
      let imageUrl = '0';
      if (this.paymentMethod === 'transferencia' && this.imageFile) {
        const uploadResponse: any = await this.servicio.uploadImage(this.imageFile).toPromise();
        if (uploadResponse.estado) {
          imageUrl = uploadResponse.rutaImagen;
        } else {
          throw new Error('Error al subir el comprobante');
        }
      }

      // Obtener BOO_CODE si está disponible
      let booCode = '';
      try {
        booCode = await this.servicio.getSession('BOO_CODE') || "";
      } catch (e) {
        console.log('No se encontró BOO_CODE en sesión');
      }

      // Datos para el pago
      const paymentData = {
        accion: 'completeOrderPayment',
        ORD_CODE: this.ORD_CODE,
        ORD_PAYMENT: this.paymentMethod,
        ORD_PAYMENT_ID: this.paymentMethod === 'transferencia' ? this.transferId : '0',
        ORD_IMAGE: this.paymentMethod === 'transferencia' ? imageUrl : '0',
        ORD_STATUS: '1',
        ORD_TOTAL: this.total,
        BOO_CODE: booCode // Opcional, solo si existe
      };

      // Enviar datos
      this.servicio.postData(paymentData).subscribe(async (res: any) => {
        await loading.dismiss();
        
        if (res.estado === true) {
          const alert = await this.alertCtrl.create({
            header: 'Éxito',
            message: res.mensaje,
            buttons: [{
              text: 'OK',
              handler: () => {
                this.navCtrl.navigateRoot('/admin-orders');
              }
            }]
          });
          await alert.present();
        } else {
          throw new Error(res.mensaje || 'Error al procesar el pago');
        }
      }, async (error) => {
        await loading.dismiss();
        throw error;
      });

    } catch (error: any) {
      await loading.dismiss();
      const alert = await this.alertCtrl.create({
        header: 'Error',
        message: error.message,
        buttons: ['OK']
      });
      await alert.present();
    }
  }
}