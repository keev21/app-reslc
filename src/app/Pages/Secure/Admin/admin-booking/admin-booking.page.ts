import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';
import { ModalController, AlertController, NavController } from '@ionic/angular';
import { ModalBookingPage } from './modal-booking/modal-booking.page';


@Component({
  selector: 'app-admin-booking',
  standalone: false,
  templateUrl: './admin-booking.page.html',
  styleUrls: ['./admin-booking.page.scss'],
})
export class AdminBookingPage implements OnInit {
  bookings: any[] = [];
  nombreCliente: string = '';
  fechaReserva: string = '';
  selectedBranchId: string = '';
  branchName: string = '';
  rol: string = '';

  constructor(
    private authService: AuthService,
    private modalCtrl: ModalController,
    private alertController: AlertController,
    private navCtrl: NavController
  ) {
    this. authService.getSession('ROL_TYPE').then((res: any) => {
      this.rol = res;
      console.log('Rol:', this.rol);
    });

  }

  async ngOnInit() {
    this.selectedBranchId = await this.authService.getSession('BRAN_CODE') || '';
    if (this.selectedBranchId) {
      this.loadBranchName();
      this.loadBookings();
    } else {
      this.authService.showToast('No se encontró sucursal asignada');
    }
  }

  loadBranchName() {
    let datos = {
      accion: 'getBranchName',
      id: this.selectedBranchId
    };
    this.authService.postData(datos).subscribe((res: any) => {
      if (res.estado === true) {
        this.branchName = res.nombre;
      }
    });
  }

  loadBookings() {
    let datos = {
      accion: 'cargarReservas',
      sucursal: this.selectedBranchId,
      nombre: this.nombreCliente,
      fecha: this.fechaReserva
    };
    
    this.authService.postData(datos).subscribe((res: any) => {
      if (res.estado === true) {
        this.bookings = res.reservas;
      } else {
        this.authService.showToast(res.mensaje);
      }
    });
  }

  buscarPorNombre() {
    this.loadBookings();
  }

  buscarPorFecha() {
    this.loadBookings();
  }

  limpiarFiltros() {
    this.nombreCliente = '';
    this.fechaReserva = '';
    this.loadBookings();
  }

  async openBookingModal(booking: any = null) {
    if (booking) {
      this.authService.createSession('BOOKING_CODE', booking.id);
    } else {
      this.authService.createSession('BOOKING_CODE', '');
    }

    const modal = await this.modalCtrl.create({
      component: ModalBookingPage,
      componentProps: {
        branchId: this.selectedBranchId
      }
    });

    modal.onDidDismiss().then(() => {
      this.loadBookings();
    });

    await modal.present();
  }
  async addOrder(booking: any) {
    const alert = await this.alertController.create({
      header: 'Confirmar',
      message: '¿Desea agregar un pedido para esta reserva?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Aceptar',
          handler: () => {
            this.processOrder(booking.id);
          }
        }
      ]
    });
  
    await alert.present();
  }
  async processOrder(bookingId: string) {
    const datos = {
      accion: 'verificarOrdenReserva',
      boo_code: bookingId
    };
  
    this.authService.postData(datos).subscribe(async (res: any) => {
      if (res.estado === true) {
        // Ya existe una orden, solo guardamos las variables de sesión
        await this.authService.createSession('ORD_CODE', res.ord_code);
        await this.authService.createSession('BOO_CODE', bookingId);
        this.navCtrl.navigateForward('/admin-order');
      } else {
        // No existe orden, creamos una nueva
        this.createNewOrder(bookingId);
      }
    }, error => {
      this.authService.showToast('Error al verificar la orden');
    });
  }
  async createNewOrder(bookingId: string) {
    const datos = {
      accion: 'crearOrdenReserva',
      boo_code: bookingId
    };
  
    this.authService.postData(datos).subscribe(async (res: any) => {
      if (res.estado === true) {
        await this.authService.createSession('ORD_CODE', res.ord_code);
        console.log('ORD_CODE:', res.ord_code);
        await this.authService.createSession('BOO_CODE', bookingId);
        console.log('BOO_CODE:', bookingId);
       this.navCtrl.navigateForward('/admin-order');
      } else {
        this.authService.showToast(res.mensaje || 'Error al crear la orden');
      }
    }, error => {
      this.authService.showToast('Error al crear la orden');
    });
  }
  

  

  async deleteBooking(bookingId: string) {
    const alert = await this.alertController.create({
      header: 'Confirmar eliminación',
      message: '¿Estás seguro de que deseas eliminar esta reserva?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Eliminar',
          handler: () => {
            this.confirmDelete(bookingId);
          }
        }
      ]
    });

    await alert.present();
  }

  confirmDelete(bookingId: string) {
    let datos = {
      accion: 'eliminarReserva',
      id: bookingId
    };

    this.authService.postData(datos).subscribe((res: any) => {
      if (res.estado === true) {
        this.authService.showToast('Reserva eliminada correctamente');
        this.loadBookings();
      } else {
        this.authService.showToast(res.mensaje);
      }
    });
  }

  back() {
    this.navCtrl.back();
  }
}