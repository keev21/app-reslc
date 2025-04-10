import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/Services/auth.service';
import { ModalBookingUserPage } from '../modal-booking-user/modal-booking-user.page';

@Component({
  selector: 'app-modal-booking',
  standalone: false,
  templateUrl: './modal-booking.page.html',
  styleUrls: ['./modal-booking.page.scss'],
})
export class ModalBookingPage implements OnInit {
  bookingId: string = '';
  clienteId: string = '';
  clienteNombre: string = 'Seleccionar cliente';
  fechaReserva: string = new Date().toISOString();
  mesaId: string = '';
  estado: string = '0';
  mesas: any[] = [];
  branchId: string = '';

  constructor(
    private modalCtrl: ModalController,
    private authService: AuthService,
    private alertController: AlertController
  ) { }

  async ngOnInit() {
    this.bookingId = await this.authService.getSession('BOOKING_CODE') || '';
    this.branchId = await this.authService.getSession('BRAN_CODE')|| '';
    
    if (this.bookingId) {
      this.loadBookingData();
    }
    this.loadMesas();
  }

  async openUserModal() {
    const modal = await this.modalCtrl.create({
      component: ModalBookingUserPage,
      componentProps: {
        branchId: this.branchId
      }
    });

    modal.onDidDismiss().then((data) => {
      if (data.data) {
        this.clienteId = data.data.id;
        this.clienteNombre = data.data.nombre;
      }
    });

    await modal.present();
  }

  loadBookingData() {
    const datos = {
      accion: 'cargarReserva',
      id: this.bookingId
    };
    
    this.authService.postData(datos).subscribe((res: any) => {
      if (res.estado === true) {
        const booking = res.reserva;
        this.clienteId = booking.cliente_id;
        this.clienteNombre = booking.nombre_cliente || 'Seleccionar cliente';
        this.fechaReserva = booking.fecha_reserva;
        this.mesaId = booking.mesa_id;
        this.estado = booking.estado;
      } else {
        this.authService.showToast(res.mensaje);
      }
    });
  }

  loadMesas() {
    if (!this.branchId) {
      this.authService.showToast('No se ha seleccionado sucursal');
      return;
    }

    const datos = {
      accion: 'cargarMesasParaReservas',
      sucursal: this.branchId
    };
    
    this.authService.postData(datos).subscribe((res: any) => {
      if (res.estado === true) {
        this.mesas = res.mesas;
      } else {
        this.authService.showToast(res.mensaje);
      }
    });
  }

  async guardar() {
    // Validaciones
    if (!this.clienteId) {
      this.authService.showToast('Debe seleccionar un cliente');
      return;
    }

    if (!this.mesaId) {
      this.authService.showToast('Debe seleccionar una mesa');
      return;
    }

    if (!this.fechaReserva) {
      this.authService.showToast('Debe seleccionar una fecha y hora');
      return;
    }

    const datos = {
      accion: this.bookingId ? 'editarReserva' : 'crearReserva',
      id: this.bookingId || '',
      cliente_id: this.clienteId,
      fecha_reserva: this.fechaReserva,
      mesa_id: this.mesaId,
      estado: this.estado
    };

    this.authService.postData(datos).subscribe(async (res: any) => {
      if (res.estado === true) {
        this.authService.showToast(this.bookingId ? 'Reserva actualizada' : 'Reserva creada');
        this.modalCtrl.dismiss({ success: true });
      } else {
        const alert = await this.alertController.create({
          header: 'Error',
          message: res.mensaje || 'Error al guardar la reserva',
          buttons: ['OK']
        });
        await alert.present();
      }
    });
  }

  cancelar() {
    this.modalCtrl.dismiss();
  }
}