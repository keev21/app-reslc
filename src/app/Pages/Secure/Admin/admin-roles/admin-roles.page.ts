import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/Services/auth.service';
import { AlertController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { RoleModalPage } from './role-modal/role-modal.page';

@Component({
  selector: 'app-admin-roles',
  standalone: false,
  templateUrl: './admin-roles.page.html',
  styleUrls: ['./admin-roles.page.scss'],
})
export class AdminRolesPage implements OnInit {
  roles: any[] = []; // Lista de roles

  constructor(
    public navCtrl: NavController,
    public authService: AuthService,
    private alertController: AlertController,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    this.loadRoles(); // Cargar roles al iniciar
  }

  // Cargar roles
  loadRoles() {
    let datos = {
      accion: 'cargarRoles'
    };
    this.authService.postData(datos).subscribe((res: any) => {
      if (res.estado === true) {
        this.roles = res.roles;
      } else {
        this.authService.showToast(res.mensaje);
      }
    });
  }

  // Abrir modal para agregar/editar rol
  async openRoleModal(role: any = null) {
    if (role) {
      this.authService.createSession('ROL_CODE', role.id); // Guardar el ID del rol si se está editando
    } else {
      this.authService.createSession('ROL_CODE', ''); // Limpiar el ID si es un nuevo rol
    }

    const modal = await this.modalCtrl.create({
      component: RoleModalPage,
    });

    modal.onDidDismiss().then(() => {
      this.loadRoles(); // Recargar roles después de cerrar el modal
    });

    await modal.present();
  }

  // Eliminar rol con confirmación
  async deleteRole(roleId: string) {
    const alert = await this.alertController.create({
      header: 'Confirmar eliminación',
      message: '¿Estás seguro de que deseas eliminar este rol?',
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
            this.confirmDelete(roleId); // Llamar a la función de eliminación
          }
        }
      ]
    });

    await alert.present(); // Mostrar la alerta
  }

  // Confirmar eliminación del rol
  confirmDelete(roleId: string) {
    let datos = {
      accion: 'eliminarRol',
      id: roleId
    };

    this.authService.postData(datos).subscribe((res: any) => {
      if (res.estado === true) {
        this.authService.showToast('Rol eliminado correctamente.');
        this.loadRoles(); // Recargar la lista de roles
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