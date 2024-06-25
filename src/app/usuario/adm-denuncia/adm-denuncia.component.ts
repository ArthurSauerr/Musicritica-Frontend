import { Usuario } from './../../shared/model/Usuario';
import { Component, HostListener, OnInit } from '@angular/core';
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
  public denuncia: Denuncia;
  public searchTerm: string = '';
  public startDate: string = '';
  public endDate: string = '';

  showModalDenuncia: boolean = false;
  comentarioSelecionado: String;



  constructor(
    private denunciaService: DenunciaService,
    private usuarioService: UsuarioService,
  ) {}

  ngOnInit(): void {
    this.listarTodos();
  }

  buscarDenuncias(event: Event): void {
    event.preventDefault();

    if (this.searchTerm.trim() !== '') {
      this.buscarDenunciaPorNome(event);
    } else if (this.startDate !== '' && this.endDate !== '') {
      this.buscarDenunciaPorData(event);
    } else {
      this.listarTodos();
    }
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

  truncateText(text: string, maxLength: number): { truncatedText: string, isTruncated: boolean } {
    if (text.length > maxLength) {
        return { truncatedText: text.substring(0, maxLength), isTruncated: true };
    }
    return { truncatedText: text, isTruncated: false };
}


  applyDateMask(event: Event): void {
    let input = event.target as HTMLInputElement;
    let value = input.value.replace(/\D/g, '');
    let newValue = '';

    if (value.length > 0) {
      newValue += value.substring(0, 2);
    }
    if (value.length >= 3) {
      newValue += '-' + value.substring(2, 4);
    }
    if (value.length >= 5) {
      newValue += '-' + value.substring(4, 8);
    }

    input.value = newValue;
  }



  buscarDenunciaPorData(event: Event): void {
    event.preventDefault();
    const dataInicio = this.startDate ? this.formatDate(this.startDate) : '';
    const dataFim = this.endDate ? this.formatDate(this.endDate) : '';

    this.denunciaService.buscarDenunciaPorData(dataInicio, dataFim).subscribe(
      (data: Denuncia[]) => {
        this.denuncias = data;
      },
      (error: any) => {
        console.error('Erro ao buscar denúncias por data:', error);
        console.error(dataInicio + dataFim);
        // Tratar o erro conforme necessário, exibir mensagem de erro, etc.
      }
    );
  }

  formatDate(date: string): string {
    const parts = date.split('/');
    if (parts.length === 3) {
      return `${parts[2]}-${parts[1]}-${parts[0]}`;
    }
    return date;
  }

  openModal(comentario: String) {
    this.comentarioSelecionado = comentario;
    this.showModalDenuncia = true;
  }


  closeModalDenuncia() {
    this.showModalDenuncia = false;
  }

  fecharDenuncia(denuncia: any) {
    // Lógica para fechar a denúncia
    console.log('Fechar Denúncia:', denuncia);
  }

  deletarComentario(denuncia: any) {
    // Lógica para deletar o comentário
    console.log('Deletar Comentário:', denuncia);
  }


}



