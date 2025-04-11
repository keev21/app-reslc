import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../../Services/auth.service';

@Component({
  selector: 'app-admin-order-details',
  standalone: false,
  templateUrl: './admin-order-details.page.html',
  styleUrls: ['./admin-order-details.page.scss'],
})
export class AdminOrderDetailsPage implements OnInit {
  ORDD_CODE: string = '';
  constructor(
    private servicio: AuthService

  ) 
  { 
    this.servicio.getSession('ORDD_CODE').then((res: any) => {
      this.ORDD_CODE = res;
      console.log('ORDD_CODE:', this.ORDD_CODE);
    });

  }

  ngOnInit() {
  }

}
