import { Usuario } from './../../shared/model/Usuario';
import { Component, OnInit } from '@angular/core';
import { DenunciaService } from './../../shared/service/denuncia-service.service';
import { Denuncia } from 'src/app/shared/model/Denuncia';
import { UsuarioService } from 'src/app/shared/service/usuario.service';
import { switchMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-adm-denuncia',
  templateUrl: './adm-denuncia.component.html',
  styleUrls: ['./adm-denuncia.component.scss']
})
export class AdmDenunciaComponent implements OnInit {
  public denuncias: Denuncia[] = [];
  public searchTerm: string = '';

  constructor(
    private denunciaService: DenunciaService,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit(): void {
    this.listarTodos();
  }

  listarTodos(): void {
    this.denunciaService.listarDenuncias().subscribe(
      (data: Denuncia[]) => {
        this.denuncias = data;
      },
      (error: any) => {
        console.error('Erro ao carregar denúncias:', error);
        // Tratar o erro conforme necessário, exibir mensagem de erro, etc.
      }
    );
  }

  buscarDenunciaPorNome(event: Event): void {
    event.preventDefault();
    const usuario = this.searchTerm;
    console.log(`Buscando denúncias para o usuário: ${usuario}`);
    // Chamar o serviço para buscar denúncias por nome de usuário
    if(!usuario) {
      this.listarTodos();
    }
    this.denunciaService.buscarDenunciaPorNome(usuario).subscribe(
      (data: Denuncia[]) => {
        this.denuncias = data;
      },
      (error: any) => {
        console.error('Erro ao buscar denúncias:', error);
        // Tratar o erro conforme necessário, exibir mensagem de erro, etc.
      }
    );
  }

  truncateText(text: string, limit: number): string {
    if (text.length > limit) {
      return text.substring(0, limit) + '...';
    }
    return text;
  }


}



