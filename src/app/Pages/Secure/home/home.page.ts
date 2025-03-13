import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  menuVisible: boolean = false;
  darkModeToggle: boolean = false;

  constructor() { }

  ngOnInit() {
    this.loadDarkModePreference();
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

  toggleDarkMode(event: any) {
    this.darkModeToggle = event.detail.checked;
    document.body.classList.toggle('dark', this.darkModeToggle);
    localStorage.setItem('darkMode', JSON.stringify(this.darkModeToggle));
  }

  loadDarkModePreference() {
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode) {
      this.darkModeToggle = JSON.parse(savedDarkMode);
      document.body.classList.toggle('dark', this.darkModeToggle);
    }
  }
}
