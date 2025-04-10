import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../Services/auth.service';

@Component({
  selector: 'app-admin-order',
  standalone: false,
 
  templateUrl: './admin-order.page.html',
  styleUrls: ['./admin-order.page.scss'],
})
export class AdminOrderPage implements OnInit {
  orden: string = '';
  booking: string = '';

  constructor(
    public servicio: AuthService

  ) 
  { 
    this.servicio.getSession('ORD_CODE').then((res: any) => {
      this.orden = res;
      console.log('ORD_CODE:', this.orden);
    });
    this.servicio.getSession('BOO_CODE').then((res: any) => {
      this.booking = res;
      console.log('BOO_CODE:', this.booking);
    });

  }

  ngOnInit() {
  }

}

