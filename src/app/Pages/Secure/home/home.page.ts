import { Component, OnInit, HostListener } from '@angular/core';
import { NavController, AlertController  } from '@ionic/angular';
import {AuthService} from '../../../Services/auth.service';


@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  menuVisible: boolean = false;
  darkModeToggle: boolean = false;
  rol: string = '';
  branch: string = '';
  user: string = '';
  constructor(
    public servicio: AuthService, public navCtrl: NavController, private alertCtrl: AlertController,

  ) 
  { 
    this.servicio.getSession('ROL_CODE').then((res: any) => {
      this.rol = res;
      console.log('Rol:', this.rol);
    });
    this.servicio.getSession('BRAN_CODE').then((res: any) => {
      this.branch = res;
      console.log('Branch:', this.branch);
    });
    this.servicio.getSession('USER_CODE').then((res: any) => {
      this.user = res;
      console.log('User:', this.user);
    });
  }
  ngOnInit() {
  }

  toggleMenu() {
    this.menuVisible = !this.menuVisible;
  }

  viewMenu() {
    console.log('Navegar a la página del menú del restaurante');
  }

  viewSpecials() {
    console.log('Navegar a la página de especiales del restaurante');
  }

  reservations() {
    console.log('Abrir sistema de reservaciones');
  }

  contactUs() {
    console.log('Navegar a la página de contacto');
  }

  aboutUs() {
    console.log('Navegar a la página sobre nosotros');
  }

  goToProfile() {
    console.log('Navegar al perfil del usuario');
  }

  viewOrders() {
    console.log('Navegar a la página de órdenes del usuario');
  }

  logout() {
    console.log('Cerrar sesión del usuario');
  }
  floors(){
    this.navCtrl.navigateForward('admin-floors');
  }
  branches(){
    this.navCtrl.navigateForward('admin-branch');
  }
  inventory(){
    this.navCtrl.navigateForward('admin-inventory');
  }
  products(){
    this.navCtrl.navigateForward('admin-products');
  }

  recipes(){
    this.navCtrl.navigateForward('admin-recipes');
  }
  toggleDarkMode(event: any) {
    this.darkModeToggle = event.detail.checked;
    document.body.classList.toggle('dark', this.darkModeToggle);
    localStorage.setItem('darkMode', JSON.stringify(this.darkModeToggle));
  }



  @HostListener('window:beforeunload', ['$event'])
  async handleBeforeUnload(event: any) {
    const alert = await this.alertCtrl.create({
      header: 'Cerrar sesión',
      message: '¿Estás seguro de que deseas cerrar sesión?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            event.preventDefault(); // Cancelar la acción de cerrar
          }
        },
        {
          text: 'Sí',
          handler: () => {
            this.cerrarSession(); // Llama al método de cerrar sesión
          }
        }
      ]
    });
    await alert.present();
    event.returnValue = ''; // Este valor es necesario para que el navegador muestre el cuadro de diálogo
  }
  async confirmarCerrarSesion() {
    const alert = await this.alertCtrl.create({
      header: 'Cerrar sesión',
      message: '¿Estás seguro de que deseas cerrar sesión?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            // El usuario eligió no cerrar sesión
            history.pushState(null, '');
          }
        },
        {
          text: 'Sí',
          handler: () => {
            this.cerrarSession(); // Llama al método de cerrar sesión
          }
        }
      ]
    });
    await alert.present();
  }
  
  cerrarSession() {
    this.servicio.closeSession('USAD_CODE');
    this.navCtrl.navigateRoot('login', { replaceUrl: true });
  }
 
}
