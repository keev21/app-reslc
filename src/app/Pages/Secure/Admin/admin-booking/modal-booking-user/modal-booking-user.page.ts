import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-modal-booking-user',
  standalone: false,
  templateUrl: './modal-booking-user.page.html',
  styleUrls: ['./modal-booking-user.page.scss'],
})
export class ModalBookingUserPage implements OnInit {
  clientes: any[] = [];
  clientesFiltrados: any[] = [];
  terminoBusqueda: string = '';
  isLoading: boolean = true;

  constructor(
    private modalCtrl: ModalController,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.cargarClientes();
  }

  cargarClientes() {
    this.isLoading = true;
    const datos = {
      accion: 'cargarClientes3'
    };

    this.authService.postData(datos).subscribe((res: any) => {
      this.isLoading = false;
      if (res.estado === true) {
        this.clientes = res.clientes;
        this.clientesFiltrados = [...this.clientes];
      } else {
        this.authService.showToast(res.mensaje);
      }
    }, () => {
      this.isLoading = false;
      this.authService.showToast('Error al cargar clientes');
    });
  }

  filtrarClientes() {
    if (!this.terminoBusqueda) {
      this.clientesFiltrados = [...this.clientes];
      return;
    }

    const termino = this.terminoBusqueda.toLowerCase();
    this.clientesFiltrados = this.clientes.filter(cliente => 
      cliente.nombre.toLowerCase().includes(termino) ||
      cliente.apellido.toLowerCase().includes(termino) ||
      cliente.telefono.toLowerCase().includes(termino)
    );
  }

  seleccionarCliente(cliente: any) {
    this.modalCtrl.dismiss({
      id: cliente.codigo,
      nombre: `${cliente.nombre} ${cliente.apellido}`
    });
  }

  cancelar() {
    this.modalCtrl.dismiss();
  }
}