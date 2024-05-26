import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlertaServiceService {

  constructor() { }

  showAlert1(): void {
    const alertDiv = document.getElementById('alert1') as HTMLDivElement;
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
      }, 3000); 
    }
  }
  showAlert2(): void {
    const alertDiv = document.getElementById('alert2') as HTMLDivElement;
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
      }, 3000); 
    }
  }

}
