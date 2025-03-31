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
  segmento: string = 'empleados'; // 'empleados' o 'clientes'

  constructor(
    public navCtrl: NavController,
    public authService: AuthService,
    private alertController: AlertController,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
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

  // Cargar usuarios según el segmento seleccionado
  loadUsers() {
    let datos = {
      accion: this.segmento === 'empleados' ? 'cargarEmpleados' : 'cargarClientes',
      busqueda: this.busqueda,
      branch: this.branch
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
      if (this.segmento === 'empleados') {
        // Para empleados guardamos ambos códigos
        await this.authService.createSession('USER_CODE', usuario.id || usuario.id_info);
        await this.authService.createSession('INFO_CODE', usuario.id_info);
        //guardar la variable segmento
        await this.authService.createSession('SEGMENTO', 'empleados');
        

      } else {
        // Para clientes solo guardamos INFO_CODE
        await this.authService.createSession('INFO_CODE', usuario.id_info);
        await this.authService.createSession('USER_CODE', ''); // Limpiamos USER_CODE por si acaso
        //guardar la variable segmento
        await this.authService.createSession('SEGMENTO', 'clientes');
      }
    } else {
      // Si es nuevo usuario, limpiamos ambos códigos
      await this.authService.createSession('USER_CODE', '');
      await this.authService.createSession('INFO_CODE', '');
      await this.authService.createSession('SEGMENTO', this.segmento);
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
  async deleteUser(usuario: any) {
    const esEmpleado = this.segmento === 'empleados';
    const id = esEmpleado ? usuario.id : usuario.id_info;
    const tipoUsuario = esEmpleado ? 'empleado' : 'cliente';

    const alert = await this.alertController.create({
      header: 'Confirmar eliminación',
      message: `¿Estás seguro de que deseas eliminar este ${tipoUsuario}?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Eliminar',
          handler: () => {
            this.confirmDelete(id, esEmpleado);
          }
        }
      ]
    });

    await alert.present();
  }

  // Confirmar eliminación del usuario
  confirmDelete(id: string, esEmpleado: boolean) {
    let datos = {
      accion: esEmpleado ? 'eliminarEmpleado' : 'eliminarCliente',
      id: id
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