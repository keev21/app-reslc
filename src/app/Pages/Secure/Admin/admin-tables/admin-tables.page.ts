import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/Services/auth.service';
import { AlertController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { TableModalPage } from './table-modal/table-modal.page';

@Component({
  selector: 'app-admin-tables',
  standalone: false,
  templateUrl: './admin-tables.page.html',
  styleUrls: ['./admin-tables.page.scss'],
})
export class AdminTablesPage implements OnInit {
  branches: any[] = []; // Lista de sucursales
  floors: any[] = []; // Lista de pisos
  tables: any[] = []; // Lista de mesas
  selectedBranchId: string = ''; // ID de la sucursal seleccionada
  selectedFloorId: string = ''; // ID del piso seleccionado

  constructor(
    public navCtrl: NavController,
    public authService: AuthService,
    private alertController: AlertController,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    this.loadBranches(); // Cargar sucursales al iniciar
  }

  // Cargar sucursales
  loadBranches() {
    let datos = {
      accion: 'cargarSucursales'
    };
    this.authService.postData(datos).subscribe((res: any) => {
      if (res.estado === true) {
        this.branches = res.sucursales;
      } else {
        this.authService.showToast(res.mensaje);
      }
    });
  }

  // Seleccionar sucursal
  onBranchSelect(event: any) {
    this.selectedBranchId = event.detail.value;
    this.authService.createSession('BRAN_CODE', this.selectedBranchId); // Guardar el ID de la sucursal
    this.loadFloors(); // Cargar pisos de la sucursal seleccionada
  }

  // Cargar pisos por sucursal
  loadFloors() {
    if (!this.selectedBranchId) {
      this.authService.showToast('Seleccione una sucursal.');
      return;
    }

    let datos = {
      accion: 'cargarPisosPorSucursal',
      sucursal: this.selectedBranchId
    };
    this.authService.postData(datos).subscribe((res: any) => {
      if (res.estado === true) {
        this.floors = res.pisos;
      } else {
        this.authService.showToast(res.mensaje);
      }
    });
  }

  // Seleccionar piso
  onFloorSelect(event: any) {
    this.selectedFloorId = event.detail.value;
    this.authService.createSession('FLOO_CODE', this.selectedFloorId); // Guardar el ID del piso
    this.loadTables(); // Cargar mesas del piso seleccionado
  }

  // Cargar mesas por piso
  loadTables() {
    if (!this.selectedFloorId) {
      this.authService.showToast('Seleccione un piso.');
      return;
    }

    let datos = {
      accion: 'cargarMesas',
      piso: this.selectedFloorId
    };
    this.authService.postData(datos).subscribe((res: any) => {
      if (res.estado === true) {
        this.tables = res.mesas;
      } else {
        this.authService.showToast(res.mensaje);
      }
    });
  }

  // Abrir modal para agregar/editar mesa
  async openTableModal(table: any = null) {
    if (table) {
      this.authService.createSession('TAB_CODE', table.id); // Guardar el ID de la mesa si se está editando
    } else {
      this.authService.createSession('TAB_CODE', ''); // Limpiar el ID si es una nueva mesa
    }

    const modal = await this.modalCtrl.create({
      component: TableModalPage,
    });

    modal.onDidDismiss().then(() => {
      this.loadTables(); // Recargar mesas después de cerrar el modal
    });

    await modal.present();
  }

  // Eliminar mesa con confirmación
  async deleteTable(tableId: string) {
    const alert = await this.alertController.create({
      header: 'Confirmar eliminación',
      message: '¿Estás seguro de que deseas eliminar esta mesa?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Eliminación cancelada');
          }
        },
        {
          text: 'Eliminar',
          handler: () => {
            this.confirmDelete(tableId); // Llamar a la función de eliminación
          }
        }
      ]
    });

    await alert.present(); // Mostrar la alerta
  }

  // Confirmar eliminación de la mesa
  confirmDelete(tableId: string) {
    let datos = {
      accion: 'eliminarMesa',
      id: tableId
    };

    this.authService.postData(datos).subscribe((res: any) => {
      if (res.estado === true) {
        this.authService.showToast('Mesa eliminada correctamente.');
        this.loadTables(); // Recargar la lista de mesas
      } else {
        this.authService.showToast(res.mensaje);
      }
    });
  }

  // Navegar hacia atrás
  back() {
    this.navCtrl.back();
  }
}