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
  segmento: string = 'empleados'; // 'empleados' o 'clientes'

  constructor(
    public navCtrl: NavController,
    public authService: AuthService,
    private alertController: AlertController,
    private modalCtrl: ModalController
  ) {
    this.authService.getSession('ROL_CODE').then((res: any) => {
      this.rol = res || '';
      console.log('Rol:', this.rol);
    });
    this.authService.getSession('BRAN_CODE').then((res: any) => {
      this.branch = res || '';
      this.loadUsers(); 
      console.log('Branch:', this.branch);
    });
    
  }

  ngOnInit() {
   // Cargar usuarios al iniciar
  }

  // Cargar usuarios según el segmento seleccionado
  loadUsers() {
    let datos = {
      accion: this.segmento === 'empleados' ? 'cargarEmpleados' : 'cargarClientes',
      busqueda: this.busqueda,
      branch: this.branch // Enviamos la sucursal actual
    };

    this.authService.postData(datos).subscribe((res: any) => {
      if (res.estado === true) {
        this.usuarios = res.usuarios;
      } else {
        this.authService.showToast(res.mensaje);
        this.usuarios = [];
      }
    });
  }

  // Cambiar entre empleados y clientes
  segmentChanged(event: any) {
    this.segmento = event.detail.value;
    this.loadUsers();
  }

  // Buscar usuarios
  buscarUsuarios() {
    this.loadUsers();
  }

  // Abrir modal para agregar/editar usuario
  async openUserModal(usuario: any = null) {
    if (usuario) {
      await this.authService.createSession('USER_CODE', usuario.id);// esto sirve para empleados

      await this.authService.createSession('INFO_CODE', usuario.rol);//esto sirve para cliente y empleados

    } else {
      await this.authService.createSession('USER_CODE', '');
    }

    const modal = await this.modalCtrl.create({
      component: UserModalPage,
      componentProps: {
        esEmpleado: this.segmento === 'empleados'
      }
    });

    modal.onDidDismiss().then(() => {
      this.loadUsers();
    });

    await modal.present();
  }

  // Eliminar usuario con confirmación
  async deleteUser(userId: string, esEmpleado: boolean) {
    const alert = await this.alertController.create({
      header: 'Confirmar eliminación',
      message: `¿Estás seguro de que deseas eliminar este ${esEmpleado ? 'empleado' : 'cliente'}?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Eliminar',
          handler: () => {
            this.confirmDelete(userId, esEmpleado);
          }
        }
      ]
    });

    await alert.present();
  }

  // Confirmar eliminación del usuario
  confirmDelete(userId: string, esEmpleado: boolean) {
    let datos = {
      accion: esEmpleado ? 'eliminarEmpleado' : 'eliminarCliente',
      id: userId
    };

    this.authService.postData(datos).subscribe((res: any) => {
      this.authService.showToast(res.mensaje);
      if (res.estado) {
        this.loadUsers();
      }
    });
  }

  // Navegar hacia atrás
  back() {
    this.navCtrl.back();
  }
}