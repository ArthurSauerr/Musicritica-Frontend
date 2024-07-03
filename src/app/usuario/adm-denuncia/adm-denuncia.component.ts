import { Usuario } from './../../shared/model/Usuario';
import { Component, HostListener, OnInit } from '@angular/core';
import { DenunciaService } from './../../shared/service/denuncia-service.service';
import { Denuncia } from 'src/app/shared/model/Denuncia';
import { UsuarioService } from 'src/app/shared/service/usuario.service';
import { switchMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Comentario } from 'src/app/shared/model/Comentario';
import { ComentarioServiceService } from 'src/app/shared/service/comentario-service.service';
import * as XLSX from 'xlsx';
import { AlertaServiceService } from 'src/app/shared/service/alerta-service.service';

@Component({
  selector: 'app-adm-denuncia',
  templateUrl: './adm-denuncia.component.html',
  styleUrls: ['./adm-denuncia.component.scss']
})
export class AdmDenunciaComponent implements OnInit {
  public denuncias: Denuncia[] = [];
  public denunciasPaginadas: Denuncia[] = [];
  public denuncia: Denuncia;
  public searchTerm: string = '';
  public startDate: string = '';
  public endDate: string = '';
  public usuarios: Usuario[] = [];
  usuarioSelecionado: Usuario;
  comentarioSelecionadoParaDeletar: Comentario;
  denunciaSelecionadaParaDeletar: Denuncia;

  isModalFecharDenunciaOpen: boolean;
  isModalExcluirComentarioOpen: boolean;
  showModalDenuncia: boolean = false;
  comentarioSelecionado: String;
  paginaAtual: number = 1;
  itensPorPagina: number = 10;
  totalPaginas: number = 0;

  constructor(
    private denunciaService: DenunciaService,
    private usuarioService: UsuarioService,
    private comentarioService: ComentarioServiceService,
    private alertaService: AlertaServiceService
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
        this.atualizarPaginas();  // Atualiza a paginação após obter todas as denúncias
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
    if (!usuario) {
      this.listarTodos();
    }
    this.denunciaService.buscarDenunciaPorNome(usuario).subscribe(
      (data: Denuncia[]) => {
        this.denuncias = data;
        this.atualizarPaginas();  // Atualiza a paginação após a busca
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
    const dataInicio = this.startDate ? this.startDate : '';
    const dataFim = this.endDate ? this.endDate : '';

    console.log(dataInicio);
    console.log(dataFim);

    this.denunciaService.buscarDenunciaPorData(dataInicio, dataFim).subscribe(
      (data: Denuncia[]) => {
        this.denuncias = data;
        this.atualizarPaginas();  // Atualiza a paginação após a busca
        console.log(this.denuncias);
      },
      (error: any) => {
        console.error('Erro ao buscar denúncias por data:', error);
        console.error(dataInicio + dataFim);
        // Tratar o erro conforme necessário, exibir mensagem de erro, etc.
      }
    );
  }

  openModal(comentario: String) {
    this.comentarioSelecionado = comentario;
    this.showModalDenuncia = true;
  }

  closeModalDenuncia() {
    this.showModalDenuncia = false;
  }

  fecharDenuncia(denuncia: Denuncia) {
    console.log(denuncia);
    this.denunciaService.fecharDenuncia(denuncia.id).subscribe(response => {
      this.alertaService.exibirAlerta("alertaFecharDenuncia");
      console.log('Denúncia ID:', denuncia.id);
      this.listarTodos();
    }, error => {
      console.error('Erro ao fechar a denúncia:', error);
    });
  }

  deletarComentario(comentario: Comentario, usuario: Usuario) {
    console.log(comentario);
    this.comentarioService.deletarComentario(usuario.id, comentario.id).subscribe(response => {
      this.alertaService.exibirAlerta("alertaDeletarComentario");
      console.log('Comentário deletado:', response);
      this.listarTodos();
    }, error => {
      console.error('Erro ao deletar o comentário:', error);
    });
  }

  fecharModal(): void {
    this.isModalExcluirComentarioOpen = false;
    this.isModalFecharDenunciaOpen = false;
  }

  excluirComentarioModal(comentario: Comentario, usuario: Usuario, event: Event) {
    event.stopPropagation();
    this.comentarioSelecionadoParaDeletar = comentario;
    this.usuarioSelecionado = usuario;
    this.isModalExcluirComentarioOpen = true;
  }

  fecharDenunciaModal(denuncia: Denuncia) {
    this.denunciaSelecionadaParaDeletar = denuncia;
    this.isModalFecharDenunciaOpen = true;
  }

  gerarRelatorioDenuncias() {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.denuncias.map(denuncia => ({
      'Usuário Denunciado': denuncia.usuarioReportado.nome,
      'Denunciado por': denuncia.usuario.nome,
      'Comentário': denuncia.comentario.comentario,
      'Status': denuncia.status,
      'Data': denuncia.dt_denuncia
    })));
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Denúncias');
    XLSX.writeFile(wb, 'relatorio_denuncias.xlsx');
  }

  gerarRelatorioDenunciasFechadas() {
    this.denunciaService.getDenunciasFechadas().subscribe(
      denuncias => {
        const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(denuncias.map(denuncia => ({
          'Nome': denuncia.usuarioReportado.nome,
          'Denunciado por': denuncia.usuario.nome,
          'Comentário': denuncia.comentario.comentario,
          'Status': denuncia.status,
          'Data': denuncia.dt_denuncia
        })));
        const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Denuncias Fechadas');
        XLSX.writeFile(wb, 'denuncias_fechadas.xlsx');
      },
      error => {
        console.error('Erro ao buscar denuncias:', error);
      }
    );
  }

  gerarRelatorioUsuarios() {
    this.usuarioService.getUsuariosDoMes().subscribe(
      usuarios => {
        const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(usuarios.map(usuario => ({
          'Nome': usuario.nome,
          'Email': usuario.email,
          'Data de Criação': usuario.dt_cadastro
        })));
        const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Usuários do Mês');
        XLSX.writeFile(wb, 'relatorio_usuarios_mes.xlsx');
      },
      error => {
        console.error('Erro ao buscar usuários:', error);
      }
    );
  }

  atualizarPaginas() {
    this.totalPaginas = Math.ceil(this.denuncias.length / this.itensPorPagina);
    const inicio = (this.paginaAtual - 1) * this.itensPorPagina;
    const fim = this.paginaAtual * this.itensPorPagina;
    this.denunciasPaginadas = this.denuncias.slice(inicio, fim); // Usa um array temporário para a paginação
  }


  paginaAnterior() {
    if (this.paginaAtual > 1) {
      this.paginaAtual--;
      this.atualizarPaginas();
    }
  }

  proximaPagina() {
    if (this.paginaAtual < this.totalPaginas) {
      this.paginaAtual++;
      this.atualizarPaginas();
    }
  }
}
