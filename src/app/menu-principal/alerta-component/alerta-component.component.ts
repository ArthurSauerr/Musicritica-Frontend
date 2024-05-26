import { Component } from '@angular/core';
import { AlertaServiceService } from 'src/app/shared/service/alerta-service.service';

@Component({
  selector: 'app-alerta-component',
  templateUrl: './alerta-component.component.html',
  styleUrls: ['./alerta-component.component.scss']
})
export class AlertaComponentComponent {

  constructor(private alertaService: AlertaServiceService) {} 

  mostrarAlerta1(): void {
    this.alertaService.showAlert1(); 
  }
  mostrarAlerta2(): void {
    this.alertaService.showAlert2(); 
  }
}
