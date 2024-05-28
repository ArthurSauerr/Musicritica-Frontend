import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlertaServiceService {

  constructor() { }

  exibirAlerta(elemento: string): void {
    const alertDiv = document.getElementById(elemento) as HTMLDivElement;
    if (alertDiv) {
      alertDiv.classList.remove('hidden');
      setTimeout(() => {
        alertDiv.classList.remove('opacity-0');
        alertDiv.classList.add('opacity-100');
      }, 10);
      setTimeout(() => {
        alertDiv.classList.remove('opacity-100');
        alertDiv.classList.add('opacity-0');
        setTimeout(() => {
          alertDiv.classList.add('hidden');
        }, 500); 
      }, 4000); 
    }
  }

}
