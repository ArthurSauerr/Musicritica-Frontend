import { Component } from '@angular/core';
import { Comentario } from 'src/app/shared/model/Comentario';
import { Denuncia } from 'src/app/shared/model/Denuncia';

@Component({
  selector: 'app-adm-denuncia',
  templateUrl: './adm-denuncia.component.html',
  styleUrls: ['./adm-denuncia.component.scss']
})
export class AdmDenunciaComponent {

  public denuncias: Array<Denuncia> = new Array;
  usuarioReportado: String
  comentario: Comentario
  data: String
denuncia: any;


}
