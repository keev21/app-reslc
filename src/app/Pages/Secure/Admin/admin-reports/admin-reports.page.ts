import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from '../../../../Services/auth.service';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-admin-reports',
  standalone: false,
  templateUrl: './admin-reports.page.html',
  styleUrls: ['./admin-reports.page.scss'],
})
export class AdminReportsPage implements OnInit {
  @ViewChild('reportChart', { static: true }) reportChartRef!: ElementRef;
  
  selectedReport: string = 'mostConsumed';
  selectedPeriod: string = 'all';
  reportData: any[] = [];
  chart: any;
  loading: boolean = false;

  constructor(
    public navCtrl: NavController,
    public authService: AuthService
  ) {}

  ngOnInit() {
    this.loadReportData();
  }

  onReportSelect(event: any) {
    this.selectedReport = event.detail.value;
    this.loadReportData();
  }

  onPeriodSelect(event: any) {
    this.selectedPeriod = event.detail.value;
    this.loadReportData();
  }

  getReportTitle(): string {
    const titles = {
      'mostConsumed': 'Productos más consumidos',
      'salesByCategory': 'Ventas por categoría',
      'bestCustomers': 'Mejores clientes'
    };
    return titles[this.selectedReport as keyof typeof titles] || 'Reporte';
  }

  loadReportData() {
    this.loading = true;
    
    let datos = {
      accion: 'generarReporte',
      tipo: this.selectedReport,
      periodo: this.selectedPeriod
    };

    this.authService.postData(datos).subscribe((res: any) => {
      this.loading = false;
      if (res.estado === true) {
        this.reportData = res.datos;
        this.renderChart();
      } else {
        this.authService.showToast(res.mensaje);
      }
    }, () => {
      this.loading = false;
      this.authService.showToast('Error al cargar el reporte');
    });
  }

  renderChart() {
    if (this.chart) {
      this.chart.destroy();
    }

    const ctx = this.reportChartRef.nativeElement.getContext('2d');
    
    switch (this.selectedReport) {
      case 'mostConsumed':
        this.renderMostConsumedChart(ctx);
        break;
      case 'salesByCategory':
        this.renderSalesByCategoryChart(ctx);
        break;
      case 'bestCustomers':
        this.renderBestCustomersChart(ctx);
        break;
      default:
        this.renderMostConsumedChart(ctx);
    }
  }

  renderMostConsumedChart(ctx: CanvasRenderingContext2D) {
    const labels = this.reportData.map(item => item.product_name);
    const data = this.reportData.map(item => item.quantity);

    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Cantidad consumida',
          data: data,
          backgroundColor: 'rgba(54, 162, 235, 0.7)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Top 10 Productos más consumidos'
          },
          tooltip: {
            callbacks: {
              label: (context) => {
                const data = this.reportData[context.dataIndex];
                return [
                  `Ventas: $${data.total_sales.toFixed(2)}`,
                  `Unidades: ${data.quantity}`
                ];
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Cantidad vendida'
            }
          }
        }
      }
    });
  }

  renderSalesByCategoryChart(ctx: CanvasRenderingContext2D) {
    const labels = this.reportData.map(item => item.category_name);
    const data = this.reportData.map(item => item.total_sales);

    this.chart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [{
          data: data,
          backgroundColor: [
            'rgba(255, 99, 132, 0.7)',
            'rgba(54, 162, 235, 0.7)',
            'rgba(255, 206, 86, 0.7)',
            'rgba(75, 192, 192, 0.7)',
            'rgba(153, 102, 255, 0.7)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Distribución de ventas por categoría'
          },
          tooltip: {
            callbacks: {
              label: (context) => {
                const data = this.reportData[context.dataIndex];
                return [
                  `Ventas: $${data.total_sales.toFixed(2)}`,
                  `Productos: ${data.total_products}`,
                  `Porcentaje: ${data.percentage.toFixed(1)}%`
                ];
              }
            }
          }
        }
      }
    });
  }

  renderBestCustomersChart(ctx: CanvasRenderingContext2D) {
    const labels = this.reportData.map(item => item.customer_name);
    const data = this.reportData.map(item => item.total_spent);

    this.chart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: labels,
        datasets: [{
          data: data,
          backgroundColor: [
            'rgba(255, 99, 132, 0.7)',
            'rgba(54, 162, 235, 0.7)',
            'rgba(255, 206, 86, 0.7)',
            'rgba(75, 192, 192, 0.7)',
            'rgba(153, 102, 255, 0.7)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Top 10 Mejores clientes'
          },
          tooltip: {
            callbacks: {
              label: (context) => {
                const data = this.reportData[context.dataIndex];
                return [
                  `Total gastado: $${data.total_spent.toFixed(2)}`,
                  `Visitas: ${data.visits}`,
                  `Porcentaje: ${data.percentage.toFixed(1)}%`
                ];
              }
            }
          }
        }
      }
    });
  }

  back() {
    this.navCtrl.back();
  }
}