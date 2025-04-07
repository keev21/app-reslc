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

  constructor(
    private authService: AuthService,
    private modalCtrl: ModalController,
    private alertController: AlertController,
    private navCtrl: NavController
  ) {}

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