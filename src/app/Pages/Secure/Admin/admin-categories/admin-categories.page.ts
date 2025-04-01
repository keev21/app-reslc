


import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from '../../../../Services/auth.service';
import { AlertController } from '@ionic/angular'; // Importar AlertController
import { ModalController} from '@ionic/angular';
import { CategoryModalPage } from './category-modal/category-modal.page';


@Component({
  selector: 'app-admin-categories',
  standalone: false,
  templateUrl: './admin-categories.page.html',
  styleUrls: ['./admin-categories.page.scss'],
})
export class AdminCategoriesPage implements OnInit {
  branches: any[] = [];
  categories: any[] = [];
  selectedBranchId: string = '';

  constructor(
    public navCtrl: NavController,
    public authService: AuthService,
    private alertController: AlertController,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    this.loadBranches();
  }

  // Cargar sucursales
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

  // Seleccionar sucursal
  onBranchSelect(event: any) {
    this.selectedBranchId = event.detail.value;
    this.authService.createSession('BRAN_CODE', this.selectedBranchId); // Guardar el ID de la sucursal
    this.loadCategories();
  }

  async openCategoryModal(category: any = null) {
    if (category) {
      this.authService.createSession('CAT_CODE', category.id); // Guardar el ID de la categoría si se está editando
    } else {
      this.authService.createSession('CAT_CODE', ''); // Limpiar el ID si es una nueva categoría
    }

    const modal = await this.modalCtrl.create({
      component: CategoryModalPage, // Usar el modal
    });

    modal.onDidDismiss().then(() => {
      this.loadCategories(); // Recargar categorías después de cerrar el modal
    });

    await modal.present();
  }

  // Eliminar categoría con confirmación
  async deleteCategory(categoryId: string) {
    const alert = await this.alertController.create({
      header: 'Confirmar eliminación',
      message: '¿Estás seguro de que deseas eliminar esta categoría?',
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
            this.confirmDelete(categoryId); // Llamar a la función de eliminación
          }
        }
      ]
    });

    await alert.present(); // Mostrar la alerta
  }

  // Función para eliminar la categoría
  confirmDelete(categoryId: string) {
    let datos = {
      accion: 'eliminarCategoria',
      id: categoryId
    };

    this.authService.postData(datos).subscribe((res: any) => {
      if (res.estado === true) {
        this.authService.showToast('Categoría eliminada correctamente.');
        this.loadCategories(); // Recargar la lista de categorías
      } else {
        this.authService.showToast(res.mensaje);
      }
    });
  }


  // Navegar hacia atrás
  back() {
    this.navCtrl.back();
  }
  loadCategories() {
    if (!this.selectedBranchId) {
      this.authService.showToast('Seleccione una sucursal.');
      return;
    }

    let datos = {
      accion: 'cargarCategorias',
      sucursal: this.selectedBranchId
    };
    this.authService.postData(datos).subscribe((res: any) => {
      if (res.estado === true) {
        this.categories = res.categorias;
      } else {
        this.authService.showToast(res.mensaje);
      }
    });
  }
}