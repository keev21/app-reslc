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
  reservas: any[] = [];
  pisos: any[] = [];
  mesas: any[] = [];
  busqueda: string = '';
  fecha: string = new Date().toISOString().split('T')[0];
  pisoSeleccionado: string = '';
  branch: string = '';

  constructor(
    private authService: AuthService,
    private modalCtrl: ModalController,
    private alertController: AlertController,
    private navCtrl: NavController
  ) {}

  async ngOnInit() {
    await this.loadBranch();
    this.cargarPisos();
    this.cargarReservas();
  }

  async loadBranch() {
    const branchSession = await this.authService.getSession('BRAN_CODE');
    if (!branchSession) {
      this.authService.showToast('No se pudo obtener la sucursal');
      this.navCtrl.back();
      return;
    }
    this.branch = branchSession;
  }

  cargarPisos() {
    const datos = {
      accion: 'cargarPisos2',
      branch: this.branch
    };

    this.authService.postData(datos).subscribe((res: any) => {
      if (res.estado) {
        this.pisos = res.pisos;
        if (this.pisos.length > 0) {
          this.pisoSeleccionado = this.pisos[0].FLOO_CODE;
          this.cargarMesas();
        }
      } else {
        this.authService.showToast(res.mensaje);
      }
    });
  }

  cargarMesas() {
    if (!this.pisoSeleccionado) return;

    const datos = {
      accion: 'cargarMesas',
      piso: this.pisoSeleccionado
    };

    this.authService.postData(datos).subscribe((res: any) => {
      if (res.estado) {
        this.mesas = res.mesas;
      } else {
        this.authService.showToast(res.mensaje);
      }
    });
  }

  cargarReservas() {
    const datos = {
      accion: 'cargarReservas',
      branch: this.branch,
      fecha: this.fecha,
      busqueda: this.busqueda
    };

    this.authService.postData(datos).subscribe((res: any) => {
      if (res.estado) {
        this.reservas = res.reservas;
      } else {
        this.authService.showToast(res.mensaje);
        this.reservas = [];
      }
    });
  }

  async openDatePicker() {
    const alert = await this.alertController.create({
      header: 'Seleccionar fecha',
      inputs: [
        {
          name: 'fecha',
          type: 'date',
          value: this.fecha,
          min: new Date().toISOString().split('T')[0]
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Aceptar',
          handler: (data) => {
            this.fecha = data.fecha;
            this.cargarReservas();
          }
        }
      ]
    });

    await alert.present();
  }

  cambiarPiso(event: any) {
    this.pisoSeleccionado = event.detail.value;
    this.cargarMesas();
  }

  buscarReservas() {
    this.cargarReservas();
  }

  async abrirModalReserva(reserva: any = null) {
    if (reserva) {
      await this.authService.createSession('BOO_CODE', reserva.BOO_CODE);
    } else {
      await this.authService.createSession('BOO_CODE', '');
    }

    const modal = await this.modalCtrl.create({
      component: ModalBookingPage,
      componentProps: {
        pisoSeleccionado: this.pisoSeleccionado,
        mesas: this.mesas,
        fechaSeleccionada: this.fecha
      }
    });

    modal.onDidDismiss().then((data) => {
      if (data.data?.reload) {
        this.cargarReservas();
      }
    });

    await modal.present();
  }

  async eliminarReserva(reserva: any) {
    const alert = await this.alertController.create({
      header: 'Confirmar eliminación',
      message: `¿Estás seguro de eliminar la reserva de ${reserva.INFO_NAME} ${reserva.INFO_LASTNAME}?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Eliminar',
          handler: () => {
            this.confirmarEliminar(reserva.BOO_CODE);
          }
        }
      ]
    });

    await alert.present();
  }

  confirmarEliminar(id: string) {
    const datos = {
      accion: 'eliminarReserva',
      id: id
    };

    this.authService.postData(datos).subscribe((res: any) => {
      this.authService.showToast(res.mensaje);
      if (res.estado) {
        this.cargarReservas();
      }
    });
  }

  back() {
    this.navCtrl.back();
  }
}