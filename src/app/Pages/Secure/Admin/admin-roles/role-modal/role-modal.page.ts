import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/Services/auth.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-role-modal',
  standalone: false,
  templateUrl: './role-modal.page.html',
  styleUrls: ['./role-modal.page.scss'],
})
export class RoleModalPage implements OnInit {
  roleId: string = ''; // ID del rol (si se está editando)
  tipo: string = ''; // Tipo de rol
  estado: number = 0; // Estado del rol (0 = Activo, 1 = Inactivo)
  isEditing: boolean = false; // Indica si se está editandoss

  constructor(
    private navCtrl: NavController,
    private authService: AuthService,
    private modalController: ModalController
  ) {}

  async ngOnInit() {
    this.roleId = (await this.authService.getSession('ROL_CODE')) || '';
    if (this.roleId) {
      this.isEditing = true;
      this.loadRoleData();
    }
  }

  // Cargar datos del rol
  loadRoleData() {
    let datos = {
      accion: 'cargarRol',
      id: this.roleId
    };

    this.authService.postData(datos).subscribe((res: any) => {
      if (res.estado === true) {
        this.tipo = res.rol.tipo;
        this.estado = res.rol.estado;
      } else {
        this.authService.showToast(res.mensaje);
      }
    });
  }

  // Guardar o editar el rol
  guardar() {
    let datos = {
      accion: this.isEditing ? 'editarRol' : 'guardarRol',
      id: this.roleId,
      tipo: this.tipo,
      estado: this.estado
    };

    this.authService.postData(datos).subscribe((res: any) => {
      if (res.estado === true) {
        this.authService.showToast('Rol guardado correctamente.');
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