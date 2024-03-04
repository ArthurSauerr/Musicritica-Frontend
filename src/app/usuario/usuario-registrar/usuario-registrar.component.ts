import { Component, ViewChild } from '@angular/core';
import { UsuarioService } from 'src/app/shared/service/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usuario-registrar',
  templateUrl: './usuario-registrar.component.html',
  styleUrls: ['./usuario-registrar.component.scss'],
})
export class UsuarioRegistrarComponent {
  @ViewChild('fileInput') fileInput: any;
  nome: string;
  email: string;
  senha: string;
  dt_cadastro: string;
  imagem_perfil: File;

  constructor(private usuarioService: UsuarioService, private router: Router) {}


  ngOnInit() {
    this.initializeDropzone();
  }

  registrar() {
    const formData = new FormData();
    formData.append('nome', this.nome);
    formData.append('email', this.email);
    formData.append('senha', this.senha);
    formData.append('dt_cadastro', this.dt_cadastro);
    formData.append('imagem_perfil', this.imagem_perfil);

    this.usuarioService.registrar(formData)
      .subscribe(
        (response) => {
          this.router.navigate(['usuario/login']);
          console.log('Registro bem-sucedido');
        },
        (error) => {
          console.error('Erro no registro', error);
        }
      );
  }

  fazerLogin() {
    this.router.navigate(['usuario/login']);
  }

  onFileSelected(event: any) {
    this.imagem_perfil = event.target.files[0];
    this.displayPreview(this.imagem_perfil);
  }

  displayPreview(file: File) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const preview = document.getElementById('preview') as HTMLImageElement;
      if (preview) {
        preview.src = reader.result as string;
        preview.classList.remove('hidden');
      }
    };
  }

  initializeDropzone() {
    const dropzone = document.getElementById('dropzone') as HTMLElement;

    dropzone.addEventListener('dragover', (e) => {
      e.preventDefault();
      dropzone.classList.add('custom-border-color');
    });

    dropzone.addEventListener('dragleave', (e) => {
      e.preventDefault();
      dropzone.classList.remove('custom-border-color');
    });

    dropzone.addEventListener('drop', e => {
      e.preventDefault();
      dropzone.classList.remove('custom-border-color');
      const dataTransfer = e.dataTransfer;
      if (dataTransfer) {
          const file = dataTransfer.files[0];
          if (file) {
              this.displayPreview(file);
              this.imagem_perfil = file;
          }
      }
    });

}
}
