import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-admin-edit-status-order-details',
  standalone: false,
  templateUrl: './admin-edit-status-order-details.page.html',
  styleUrls: ['./admin-edit-status-order-details.page.scss'],
})
export class AdminEditStatusOrderDetailsPage implements OnInit {

  detalles: any[] = [];
  pedidosAgrupados: any[] = [];
  buscarProducto: string = '';
  mostrarEntregados: boolean = false; // Nueva propiedad para controlar el estado
  branch: string = '';
  constructor(public servicio: AuthService, public navCtrl: NavController) {

    this.servicio.getSession('BRAN_CODE').then((res: any) => {
      this.branch = res;
      console.log('Branch:', this.branch);
    });
  }

  ngOnInit() {
    this.cargarDetalles();
  }

  cargarDetalles() {
    const datos = { 
      accion: this.mostrarEntregados ? 'consultarDetallesPedido2' : 'consultarDetallesPedido' 
    };
    console.log("datos enviado",datos),
    this.servicio.postData(datos).subscribe(
      (res: any) => {
        if (res.estado === true) {
          this.detalles = res.datos;
          this.pedidosAgrupados = this.agruparPorPedido(this.detalles);
        } else {
          this.servicio.showToast(res.mensaje);
        }
      },
      (error) => {
        console.error('Error al cargar los detalles:', error);
      }
    );
  }

  // Función para alternar entre pedidos pendientes y entregados
  togglePedidosEntregados() {
    this.mostrarEntregados = !this.mostrarEntregados;
    this.cargarDetalles();
  }



  // Función para determinar el color del badge según el estado
getEstadoColor(estado: string): string {
  switch(estado) {
    case 'Pendiente':
      return 'warning';
    case 'Entregado':
      return 'success';
    case 'Completado':
      return 'success';
    case 'Parcialmente Entregado':
      return 'danger';
    default:
      return 'medium';
  }
}

// Función para determinar el color del encabezado del pedido
getPedidoColor(pedido: any): string {
  const estado = this.obtenerEstadoGeneral(pedido);
  switch(estado) {
    case 'Completado':
      return 'success';
    case 'Parcialmente Entregado':
      return 'danger';
    default:
      return 'light';
  }
}
  agruparPorPedido(detalles: any[]) {
    let agrupados = detalles.reduce((acc, detalle) => {
      let pedidoExistente = acc.find((p: any) => p.ORD_CODE === detalle.ORD_CODE);
      if (!pedidoExistente) {
        pedidoExistente = { 
          ORD_CODE: detalle.ORD_CODE,
          ORD_DATE: detalle.ORD_DATE,
          TAB_NAME: detalle.TAB_NAME,
          detalles: [] 
        };
        acc.push(pedidoExistente);
      }
      pedidoExistente.detalles.push({
        ORDD_CODE: detalle.ORDD_CODE, // Añadido para las actualizaciones
        INV_NAME: detalle.INV_NAME,
        ORDD_QUANTITY: detalle.ORDD_QUANTITY,
        ORDD_STATUS: detalle.ORDD_STATUS
      });
      return acc;
    }, []);
    return agrupados;
  }

  buscarDetalles() {
    if (this.buscarProducto.trim() !== '') {
      const detallesFiltrados = this.detalles.filter((detalle) =>
        detalle.INV_NAME.toLowerCase().includes(this.buscarProducto.toLowerCase())
      );
      this.pedidosAgrupados = this.agruparPorPedido(detallesFiltrados);
    } else {
      this.pedidosAgrupados = this.agruparPorPedido(this.detalles);
    }
  }

  // Función para marcar un ítem específico como entregado
  marcarComoEntregado(detalle: any, ordCode: string) {
    const datos = {
      accion: 'actualizarEstadoPedido',
      ORDD_CODE: detalle.ORDD_CODE,
      ORDD_STATUS: 'Entregado'
    };

    this.servicio.postData(datos).subscribe(
      (res: any) => {
        if (res.estado === true) {
          this.servicio.showToast('Estado actualizado correctamente');
          // Actualizamos el estado localmente sin recargar toda la página
          detalle.ORDD_STATUS = 'Entregado';
        } else {
          this.servicio.showToast(res.mensaje);
        }
      },
      (error) => {
        console.error('Error al actualizar:', error);
        this.servicio.showToast('Error al actualizar el estado');
      }
    );
  }

  // Función para marcar todo el pedido como entregado
  marcarTodoComoEntregado(pedido: any) {
    const detallesPendientes = pedido.detalles.filter((d: any) => d.ORDD_STATUS === 'Pendiente');
    
    detallesPendientes.forEach((detalle: any) => {
      this.marcarComoEntregado(detalle, pedido.ORD_CODE);
    });
  }

  // Verifica si un pedido tiene ítems pendientes
  tieneItemsPendientes(pedido: any): boolean {
    return pedido.detalles.some((d: any) => d.ORDD_STATUS === 'Pendiente');
  }

  // Obtiene el estado general del pedido
  obtenerEstadoGeneral(pedido: any): string {
    if (pedido.detalles.every((d: any) => d.ORDD_STATUS === 'Entregado')) {
      return 'Completado';
    } else if (pedido.detalles.some((d: any) => d.ORDD_STATUS === 'Pendiente')) {
      return 'Pendiente';
    } else {
      return 'Parcialmente Entregado';
    }
  }

  cancelar() {
    this.navCtrl.back();
  }
}