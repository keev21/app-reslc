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
  branchinfo: any[] = [];
  rama: string = '';
  estado: string = '';
  codigo: string = '';

  constructor( public navCtrl: NavController,
    public servicio: AuthService) { 

      this.servicio.getSession('codigo').then((res: any) => {
      
        this.codigo = res;
        // console.log("el codigo que llega es:",this.codigo);
        if (this.codigo) {
          this.obtenerPiso();
        }
      });
    }

  ngOnInit() {
    this.loadbranchinfo();
  }
  back(){
    this.navCtrl.back();
  }

  obtenerPiso() {
    let datos = {
      accion: 'loadpiso', 
      codigo: this.codigo
    };
    this.servicio.postData(datos).subscribe((res: any) => {
      if (res.estado === true) {
        console.log(datos);
        let piso = res.datos[0]; 
        this.nombre = piso.nombre;
        this.tipo = piso.tipo;
        this.rama = piso.rama;
        this.estado = piso.estado;
      } else {
        this.servicio.showToast('No se encontró la regla');
      }
    }, (error) => {
      console.error('Error en la solicitud:', error);
    });
  }


  loadbranchinfo() {
    let datos = {
      "accion": "loadbranchinfo",
    }
    this.servicio.postData(datos).subscribe((res: any) => {
      if (res.estado == true) {
        this.branchinfo = res.datos;  // Guarda los datos de las sedes
        console.log("los datos son",this.branchinfo);
      } else {
        this.servicio.showToast(res.mensaje);
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
      } else {
        this.servicio.showToast(res.mensaje);
      }
    }, (error) => {
      console.error('Error en la solicitud:', error);
    });
  }
}
