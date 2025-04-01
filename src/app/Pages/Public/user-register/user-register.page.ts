import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from '../../../Services/auth.service';

@Component({
  selector: 'app-user-register',
  standalone: false,
  templateUrl: './user-register.page.html',
  styleUrls: ['./user-register.page.scss'],
})
export class UserRegisterPage implements OnInit {
  
  branch: string = '';
  branches: any[] = [];
  selectedBranchId: string = '';

  // Propiedades para el formulario
  nombre: string = '';
  apellido: string = '';
  email: string = '';
  password: string = '';
  telefono: string = '';
  direccion: string = '';
  rol: string = '2'; // Asign

  constructor(
    private authService: AuthService,
    private navCtrl: NavController
  ) {}

  ngOnInit() {
    this.loadBranches();
  }

  loadBranches() {
    let datos = {
      accion: 'cargarSucursales'
    };
    this.authService.postData(datos).subscribe((res: any) => {
      if (res.estado === true) {
        this.branches = res.sucursales;
      } else {
        this.authService.showToast(res.mensaje);
      }
    });
  }

  onBranchSelect(event: any) {
    this.selectedBranchId = event.detail.value;
    // Aquí puedes guardar el ID de la sucursal seleccionada en tu base de datos o donde necesites.
    console.log('Sucursal seleccionada:', this.selectedBranchId);
  }

  
  guardarUsuario() {
    let datos = {
      accion: 'guardarUsuario',
      nombre: this.nombre,
      apellido: this.apellido,
      email: this.email,
      password: this.password,
      telefono: this.telefono,
      direccion: this.direccion,
      rol: this.rol,
      sucursal: this.selectedBranchId
    };

    this.authService.postData(datos).subscribe((res: any) => {
      if (res.estado === true) {
        this.authService.showToast('Usuario registrado correctamente.');
        this.navCtrl.back(); // Regresar a la página anterior
      } else {
        this.authService.showToast(res.mensaje);
      }
    });
  }

  

  back() {
    this.navCtrl.back();
  }
}