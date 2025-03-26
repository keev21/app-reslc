import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/Services/auth.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-user-modal',
  standalone: false,
  templateUrl: './user-modal.page.html',
  styleUrls: ['./user-modal.page.scss'],
})
export class UserModalPage implements OnInit {
  userId: string = ''; // ID del usuario (si se está editando)
  nombre: string = '';
  apellido: string = '';
  email: string = '';
  telefono: string = '';
  direccion: string = '';
  password: string = ''; // Campo de contraseña
  rol: string = '';
  sucursal: string = '';
  roles: any[] = []; // Lista de roles
  sucursales: any[] = []; // Lista de sucursales
  isEditing: boolean = false; // Indica si se está editando
  mostrarPassword: boolean = false; // Controla si se muestra la contraseña

  constructor(
    private navCtrl: NavController,
    private authService: AuthService,
    private modalController: ModalController
  ) {}

  async ngOnInit() {
    this.userId = (await this.authService.getSession('USER_CODE')) || '';
    if (this.userId) {
      this.isEditing = true;
      this.loadUserData();
    }
    this.loadRoles();
    this.loadSucursales();
  }

  // Cargar datos del usuario
  loadUserData() {
    let datos = {
      accion: 'cargarUsuario',
      id: this.userId
    };

    this.authService.postData(datos).subscribe((res: any) => {
      if (res.estado === true) {
        this.nombre = res.usuario.nombre;
        this.apellido = res.usuario.apellido;
        this.email = res.usuario.email;
        this.telefono = res.usuario.telefono;
        this.direccion = res.usuario.direccion;
        this.rol = res.usuario.rol;
        this.sucursal = res.usuario.sucursal;
      } else {
        this.authService.showToast(res.mensaje);
      }
    });
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

  // Cargar sucursales
  loadSucursales() {
    let datos = {
      accion: 'cargarSucursales'
    };

    this.authService.postData(datos).subscribe((res: any) => {
      if (res.estado === true) {
        this.sucursales = res.sucursales;
      } else {
        this.authService.showToast(res.mensaje);
      }
    });
  }

  // Guardar o editar el usuario
  guardar() {
    let datos = {
      accion: this.isEditing ? 'editarUsuario' : 'guardarUsuario',
      id: this.userId,
      nombre: this.nombre,
      apellido: this.apellido,
      email: this.email,
      telefono: this.telefono,
      direccion: this.direccion,
      password: this.password, // Incluir la contraseña
      rol: this.rol,
      sucursal: this.sucursal
    };

    this.authService.postData(datos).subscribe((res: any) => {
      if (res.estado === true) {
        this.authService.showToast('Usuario guardado correctamente.');
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