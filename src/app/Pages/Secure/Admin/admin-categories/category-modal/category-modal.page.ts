import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/Services/auth.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-category-modal',
  standalone: false,
  templateUrl: './category-modal.page.html',
  styleUrls: ['./category-modal.page.scss'],
})
export class CategoryModalPage implements OnInit {
  categoryId: string = ''; // ID de la categoría (si se está editando)
  branchId: string = ''; // ID de la sucursal actual
  nombre: string = '';
  tipo: string = '';
  estado: number = 1; // 1 = Activo, 0 = Inactivo
  branches: any[] = []; // Lista de sucursales
  selectedBranch: any = null; // Sucursal seleccionada
  isEditing: boolean = false; // Indica si se está editando

  constructor(
    private navCtrl: NavController,
    private authService: AuthService,
    private modalController: ModalController

  ) {}

  async ngOnInit() {
    // Obtener el ID de la categoría y sucursal
    this.categoryId = (await this.authService.getSession('CAT_CODE')) || '';
    this.branchId = (await this.authService.getSession('BRAN_CODE')) || '';

    // Cargar sucursales
    this.loadBranches();

    // Si hay un ID de categoría, cargar los datos
    if (this.categoryId) {
      this.isEditing = true;
      this.loadCategoryData();
    }
  }

  // Cargar sucursales
  loadBranches() {
    let datos = {
      accion: 'cargarSucursales'
    };

    this.authService.postData(datos).subscribe((res: any) => {
      if (res.estado === true) {
        this.branches = res.sucursales;

        // Si se está editando, seleccionar la sucursal actual
        if (this.isEditing) {
          this.selectedBranch = this.branches.find(branch => branch.id === this.branchId);
        }
      } else {
        this.authService.showToast(res.mensaje);
      }
    });
  }

  // Cargar datos de la categoría
  loadCategoryData() {
    let datos = {
      accion: 'cargarCategoria',
      id: this.categoryId
    };

    this.authService.postData(datos).subscribe((res: any) => {
      if (res.estado === true) {
        this.nombre = res.categoria.nombre;
        this.tipo = res.categoria.tipo;
        this.estado = res.categoria.estado;
      } else {
        this.authService.showToast(res.mensaje);
      }
    });
  }

  // Guardar o editar la categoría
  guardar() {
    if (!this.selectedBranch) {
      this.authService.showToast('Seleccione una sucursal.');
      return;
    }

    let datos = {
      accion: this.isEditing ? 'editarCategoria' : 'guardarCategoria',
      id: this.categoryId,
      nombre: this.nombre,
      tipo: this.tipo,
      estado: this.estado,
      sucursal: this.selectedBranch.id // Usar la sucursal seleccionada
    };

    this.authService.postData(datos).subscribe((res: any) => {
      if (res.estado === true) {
        this.authService.showToast('Categoría guardada correctamente.');
        this.navCtrl.back(); // Regresar a la página anterior
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