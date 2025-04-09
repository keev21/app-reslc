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
  floors: any[] = []; // Lista de pisos
  tables: any[] = []; // Lista de mesas
  selectedBranchId: string = ''; // ID de la sucursal (obtenido de la sesión)
  selectedFloorId: string = ''; // ID del piso seleccionado
  branchName: string = ''; // Nombre de la sucursal

  constructor(
    public navCtrl: NavController,
    public authService: AuthService,
    private alertController: AlertController,
    private modalCtrl: ModalController
  ) {}

  async ngOnInit() {
    // Obtener el branch ID de la sesión
    this.selectedBranchId = await this.authService.getSession('BRAN_CODE') || "";
    if (this.selectedBranchId) {
      this.loadBranchName(); // Cargar nombre de la sucursal
      this.loadFloors(); // Cargar pisos directamente
    } else {
      this.authService.showToast('No se encontró sucursal asignada');
      this.navCtrl.back(); // Regresar si no hay sucursal asignada
      
    }
  }

  // Cargar nombre de la sucursal
  loadBranchName() {
    let datos = {
      accion: 'getBranchName',
      id: this.selectedBranchId
    };
    this.authService.postData(datos).subscribe((res: any) => {
      if (res.estado === true) {
        this.branchName = res.nombre;
      } else {
        this.authService.showToast(res.mensaje);
      }
    });
  }

  // Cargar pisos por sucursal
  loadFloors() {
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
    this.authService.createSession('FLOO_CODE', this.selectedFloorId);
    this.loadTables();
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
    if (!this.selectedFloorId) {
      this.authService.showToast('Seleccione un piso primero');
      return;
    }

    if (table) {
      this.authService.createSession('TAB_CODE', table.id);
    } else {
      this.authService.createSession('TAB_CODE', '');
    }

    const modal = await this.modalCtrl.create({
      component: TableModalPage,
      componentProps: {
        floorId: this.selectedFloorId // Pasar el piso seleccionado al modal
      }
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
            this.confirmDelete(tableId);
          }
        }
      ]
    });

    await alert.present();
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
        this.loadTables();
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