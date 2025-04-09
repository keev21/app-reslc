import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
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
    public servicio: AuthService, public navCtrl: NavController

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

 
}
