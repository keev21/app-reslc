import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from '../../../../Services/auth.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-admin-floors',
  standalone: false,
  templateUrl: './admin-floors.page.html',
  styleUrls: ['./admin-floors.page.scss'],
})
export class AdminFloorsPage implements OnInit {
  Pisos: any[] = [];
  nombrePiso: string = '';
  selectedBranchId: string = '';
  branchName: string = '';

  constructor(
    public servicio: AuthService, 
    public navCtrl: NavController,
    private alertController: AlertController
  ) {}

  async ngOnInit() {
    this.selectedBranchId = await this.servicio.getSession('BRAN_CODE') || '';
    if (this.selectedBranchId) {
      this.loadBranchName();
      this.obtenerPisos();
    } else {
      this.servicio.showToast('No se encontró sucursal asignada');
      }
  }

  loadBranchName() {
    let datos = {
      accion: 'getBranchName',
      id: this.selectedBranchId
    };
    this.servicio.postData(datos).subscribe((res: any) => {
      if (res.estado === true) {
        this.branchName = res.nombre;
      }
    });
  }

  buscarPisos() {
    let datos = {
      accion: 'consultarPisosPorSucursal',
      nombrePiso: this.nombrePiso,
      sucursal: this.selectedBranchId
    };
    this.servicio.postData(datos).subscribe((res: any) => {
      if (res.estado === true) {
        this.Pisos = res.datos;
      } else {
        this.servicio.showToast(res.mensaje);
      }
    });
  }

  obtenerPisos() {
    let datos = {
      accion: 'consultarPisosPorSucursal',
      sucursal: this.selectedBranchId
    };
    this.servicio.postData(datos).subscribe(
      (res: any) => {
        if (res.estado === true) {
          this.Pisos = res.datos;
        } else {
          this.servicio.showToast(res.mensaje);
        }
      },
      (error) => {
        console.error('Error en la solicitud:', error);
      }
    );
  }

  nuevo() {
    this.servicio.createSession('codigo','');
    this.navCtrl.navigateRoot(['edit-admin-floors']);
  }

  irEditar(codigo: string) {
    this.servicio.createSession('codigo', codigo);
    this.navCtrl.navigateRoot(['edit-admin-floors']);
  }

  async eliminar(codigo?: string) {
    if (!codigo) {
      this.servicio.showToast('Código del piso no encontrado');
      return;
    }

    const alert = await this.alertController.create({
      header: 'Confirmar eliminación',
      message: '¿Estás seguro de que deseas eliminar este piso?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Eliminar',
          handler: () => {
            this.confirmDelete(codigo);
          }
        }
      ]
    });

    await alert.present();
  }

  confirmDelete(codigo: string) {
    let datos = {
      accion: 'eliminarPiso',
      codigo: codigo
    };
    
    this.servicio.postData(datos).subscribe(
      (res: any) => {
        if (res.estado === true) {
          this.servicio.showToast('Piso eliminado correctamente');
          this.obtenerPisos();
        } else {
          this.servicio.showToast(res.mensaje);
        }
      },
      (error) => {
        console.error('Error en la solicitud:', error);
      }
    );
  }

  cancelar() {
    this.navCtrl.back();
  }
}