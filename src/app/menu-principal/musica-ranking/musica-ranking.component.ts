import { Component, OnInit } from '@angular/core';
import { AlertaServiceService } from 'src/app/shared/service/alerta-service.service';

@Component({
  selector: 'app-musica-ranking',
  templateUrl: './musica-ranking.component.html',
  styleUrls: ['./musica-ranking.component.scss']
})
export class MusicaRankingComponent  {

  nome: string = '';
  email: string = '';
  senha: string = '';

  onSubmit() {
    if (this.nome && this.email && this.senha) {
      alert('Cadastro realizado com sucesso!');
    } else {
      // Aqui a lógica é apenas para marcar o formulário como submetido para exibir os erros
      // O `ngClass` e a validação do formulário no template cuidam de exibir os alertas necessários
    }
  }
}
