import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/Services/auth.service';
import { AlertController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { UserModalPage } from './user-modal/user-modal.page';

@Component({
  selector: 'app-admin-users',
  standalone: false,
  templateUrl: './admin-users.page.html',
  styleUrls: ['./admin-users.page.scss'],
})
export class AdminUsersPage implements OnInit {
  usuarios: any[] = []; // Lista de usuarios
  busqueda: string = ''; // Texto de búsqueda
  rol: string = '';
  branch: string = '';
  user: string = '';

  constructor(
    public navCtrl: NavController,
    public authService: AuthService,
    private alertController: AlertController,
    private modalCtrl: ModalController
  ) 
  {
    this.authService.getSession('ROL_CODE').then((res: any) => {
      this.rol = res;
      console.log('Rol:', this.rol);
    });
    this.authService.getSession('BRAN_CODE').then((res: any) => {
      this.branch = res;
      console.log('Branch:', this.branch);
    });
    this.authService.getSession('USER_CODE').then((res: any) => {
      this.user = res;
      console.log('User:', this.user);
    });

  }

  ngOnInit() {
    this.loadUsers(); // Cargar usuarios al iniciar
  }

  // Cargar usuarios
  loadUsers() {
    let datos = {
      accion: 'cargarUsuarios',
      busqueda: this.busqueda
    };
    this.authService.postData(datos).subscribe((res: any) => {
      if (res.estado === true) {
        this.usuarios = res.usuarios;
      } else {
        this.authService.showToast(res.mensaje);
      }
    });
  }

  // Buscar usuarios
  buscarUsuarios() {
    this.loadUsers();
  }

  // Abrir modal para agregar/editar usuario
  async openUserModal(usuario: any = null) {
    if (usuario) {
      this.authService.createSession('USER_CODE', usuario.id); // Guardar el ID del usuario si se está editando
    } else {
      this.authService.createSession('USER_CODE', ''); // Limpiar el ID si es un nuevo usuario
    }

    const modal = await this.modalCtrl.create({
      component: UserModalPage,
    });

    modal.onDidDismiss().then(() => {
      this.loadUsers(); // Recargar usuarios después de cerrar el modal
    });

    await modal.present();
  }

  // Eliminar usuario con confirmación
  async deleteUser(userId: string) {
    const alert = await this.alertController.create({
      header: 'Confirmar eliminación',
      message: '¿Estás seguro de que deseas eliminar este usuario?',
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
            this.confirmDelete(userId); // Llamar a la función de eliminación
          }
        }
      ]
    });

    await alert.present(); // Mostrar la alerta
  }

  // Confirmar eliminación del usuario
  confirmDelete(userId: string) {
    let datos = {
      accion: 'eliminarUsuario',
      id: userId
    };

    this.authService.postData(datos).subscribe((res: any) => {
      if (res.estado === true) {
        this.authService.showToast('Usuario eliminado correctamente.');
        this.loadUsers(); // Recargar la lista de usuarios
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