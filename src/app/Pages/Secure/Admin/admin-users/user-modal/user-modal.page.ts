import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/Services/auth.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-user-modal',
  standalone: false,
  templateUrl: './user-modal.page.html',
  styleUrls: ['./user-modal.page.scss'],
})
export class UserModalPage implements OnInit {
  // IDs
  id_empleado: string = '';
  id_cliente: string = '';
  segmento: string = '';
  
  // Datos del formulario
  infoData: any = {
    INFO_CODE: '',
    INFO_NAME: '',
    INFO_LASTNAME: '',
    INFO_PHONE: '',
    INFO_ADDRES: '',
    ROL_CODE: '',
    INFO_DATE: ''
  };

  userData: any = {
    USER_CODE: '',
    INFO_CODE: '',
    USER_EMAIL: '',
    USER_PASSWORD: '',
    BRAN_CODE: ''
  };

  // Listas
  roles: any[] = [];
  branches: any[] = [];

  constructor(
    private modalController: ModalController,
    private authService: AuthService,
    private alertController: AlertController
  ) {}

  async ngOnInit() {
    await this.loadSessionData();
    await this.loadInitialData();
  }

  async loadSessionData() {
    this.id_empleado = await this.authService.getSession('USER_CODE') || '';
    this.id_cliente = await this.authService.getSession('INFO_CODE') || '';
    this.segmento = await this.authService.getSession('SEGMENTO') || '';
    
    console.log('Modal data:', {
      id_empleado: this.id_empleado,
      id_cliente: this.id_cliente,
      segmento: this.segmento
    });
  }

  async loadInitialData() {
    // Cargar datos existentes si estamos editando
    if (this.id_empleado || this.id_cliente) {
      await this.loadUserData();
    }

    // Si es empleado, cargar roles y sucursales
    if (this.segmento === 'empleados') {
      await this.loadRoles();
      await this.loadBranches();
    } else {
      // Para clientes, el rol siempre es cliente
      this.infoData.ROL_CODE = 'CLI';
    }
  }

  async loadUserData() {
    const datos = {
      accion: this.segmento === 'empleados' ? 'obtenerEmpleado' : 'obtenerCliente',
      id: this.segmento === 'empleados' ? this.id_empleado : this.id_cliente
    };

    this.authService.postData(datos).subscribe((res: any) => {
      if (res.estado) {
        if (this.segmento === 'empleados') {
          this.infoData = res.info;
          this.userData = res.user;
        } else {
          this.infoData = res.info;
        }
      } else {
        this.authService.showToast(res.mensaje);
      }
    });
  }

  async loadRoles() {
    const datos = { accion: 'cargarRoles2' };
    this.authService.postData(datos).subscribe((res: any) => {
      if (res.estado) {
        this.roles = res.roles;
      } else {
        this.authService.showToast(res.mensaje);
      }
    });
  }

  async loadBranches() {
    const datos = { accion: 'cargarSucursales2' };
    this.authService.postData(datos).subscribe((res: any) => {
      if (res.estado) {
        this.branches = res.sucursales;
      } else {
        this.authService.showToast(res.mensaje);
      }
    });
  }

  submitForm() {
    const datos = {
      accion: this.id_empleado || this.id_cliente ? 
             (this.segmento === 'empleados' ? 'actualizarEmpleado' : 'actualizarCliente') : 
             (this.segmento === 'empleados' ? 'crearEmpleado' : 'crearCliente'),
      ...this.infoData,
      ...(this.segmento === 'empleados' ? this.userData : {})
    };

    this.authService.postData(datos).subscribe((res: any) => {
      this.authService.showToast(res.mensaje);
      if (res.estado) {
        this.dismissModal(true);
      }
    });
  }

  async deleteUser() {
    const alert = await this.alertController.create({
      header: 'Confirmar eliminación',
      message: `¿Estás seguro de que deseas eliminar este ${this.segmento === 'empleados' ? 'empleado' : 'cliente'}?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Eliminar',
          handler: () => {
            const datos = {
              accion: this.segmento === 'empleados' ? 'eliminarEmpleado' : 'eliminarCliente',
              id: this.segmento === 'empleados' ? this.id_empleado : this.id_cliente
            };

            this.authService.postData(datos).subscribe((res: any) => {
              this.authService.showToast(res.mensaje);
              if (res.estado) {
                this.dismissModal(true);
              }
            });
          }
        }
      ]
    });

    await alert.present();
  }

  dismissModal(reload: boolean = false) {
    this.modalController.dismiss({
      reload: reload
    });
  }
}