import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/Services/auth.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-table-modal',
  standalone: false,
  templateUrl: './table-modal.page.html',
  styleUrls: ['./table-modal.page.scss'],
})
export class TableModalPage implements OnInit {
  tableId: string = '';
  floorId: string = '';
  nombre: string = '';
  tipo: string = '';
  estado: number = 1;
  floors: any[] = [];
  selectedFloor: any = null;
  isEditing: boolean = false;

  constructor(
    private navCtrl: NavController,
    private authService: AuthService,
    private modalController: ModalController
  ) {}

  async ngOnInit() {
    this.tableId = (await this.authService.getSession('TAB_CODE')) || '';
    this.floorId = (await this.authService.getSession('FLOO_CODE')) || '';

    this.loadFloors();

    if (this.tableId) {
      this.isEditing = true;
      this.loadTableData();
    }
  }

  // Cargar pisos
  loadFloors() {
    let datos = {
      accion: 'cargarPisos'
    };

    this.authService.postData(datos).subscribe((res: any) => {
      if (res.estado === true) {
        this.floors = res.pisos;

        if (this.isEditing) {
          this.selectedFloor = this.floors.find(floor => floor.id === this.floorId);
        }
      } else {
        this.authService.showToast(res.mensaje);
      }
    });
  }

  // Cargar datos de la mesa
  loadTableData() {
    let datos = {
      accion: 'cargarMesa',
      id: this.tableId
    };

    this.authService.postData(datos).subscribe((res: any) => {
      if (res.estado === true) {
        this.nombre = res.mesa.nombre;
        this.tipo = res.mesa.tipo;
        this.estado = res.mesa.estado;
      } else {
        this.authService.showToast(res.mensaje);
      }
    });
  }

  // Guardar o editar la mesa
  guardar() {
    if (!this.selectedFloor) {
      this.authService.showToast('Seleccione un piso.');
      return;
    }

    let datos = {
      accion: this.isEditing ? 'editarMesa' : 'guardarMesa',
      id: this.tableId,
      nombre: this.nombre,
      tipo: this.tipo,
      piso: this.selectedFloor.id,
      estado: this.estado
    };

    this.authService.postData(datos).subscribe((res: any) => {
      if (res.estado === true) {
        this.authService.showToast('Mesa guardada correctamente.');
        this.modalController.dismiss();
      } else {
        this.authService.showToast(res.mensaje);
      }
    });
  }

  // Cancelar
  cancelar() {
    this.modalController.dismiss();
  }
}