import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from '../../../../Services/auth.service';

@Component({
  selector: 'app-edit-admin-floors',
  standalone: false,
  templateUrl: './edit-admin-floors.page.html',
  styleUrls: ['./edit-admin-floors.page.scss'],
})
export class EditAdminFloorsPage implements OnInit {
  nombre: string = '';
  tipo: string = '';
  rama: string = '';
  estado: string = '1';
  codigo: string = '';
  selectedBranchId: string = '';

  constructor(
    public navCtrl: NavController,
    public servicio: AuthService
  ) {
    this.servicio.getSession('codigo').then((res: any) => {
      this.codigo = res;
      if (this.codigo) {
        this.obtenerPiso();
      }
    });

    this.servicio.getSession('BRAN_CODE').then((res: any) => {
      this.selectedBranchId = res;
      this.rama = this.selectedBranchId; // Asignar automáticamente la sucursal
    });
  }

  ngOnInit() {
    
  }

  back() {
    this.navCtrl.back();
  }

  obtenerPiso() {
    let datos = {
      accion: 'loadpiso', 
      codigo: this.codigo
    };
    this.servicio.postData(datos).subscribe((res: any) => {
      if (res.estado === true) {
        let piso = res.datos[0]; 
        this.nombre = piso.nombre;
        this.tipo = piso.tipo;
        this.rama = piso.rama;
        this.estado = piso.estado;
      }
    });
  }

  

  guardar() {
    let datos = {
      accion: this.codigo ? 'Actualizarpiso' : 'Agregarpiso',
      codigo: this.codigo || '',
      nombre: this.nombre,
      tipo: this.tipo,
      rama: this.rama,
      estado: this.estado,
    };
  
    this.servicio.postData(datos).subscribe((res: any) => {
      if (res.estado === true) {
        this.servicio.showToast(this.codigo ? 'Piso actualizado correctamente' : 'Piso guardado correctamente');
        this.navCtrl.back();
      }
    });
  }
}