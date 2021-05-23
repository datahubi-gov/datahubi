import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { ComunicService } from '../comunic.service';
import { DadosService } from '../shared/sdkcore';

@Component({
  selector: 'app-importador',
  templateUrl: './importador.component.html',
  styleUrls: ['./importador.component.css']
})
export class ImportadorComponent implements OnInit {

  constructor(
    @Inject(DadosService) public api: DadosService,
    @Inject(ComunicService) public comunic: ComunicService,
  ) { }

  @ViewChild('file') public inputFile: HTMLInputElement;
  public hoje = Date.now();

  public lista: string[] = [];
  public nomeArquivo: string = '';
  public arquivo: File = null;

  ngOnInit(): void {

  }

  confirmFileSubmit(files: FileList) {

    let file = files[0];
    this.nomeArquivo = file.name;
    var reader = new FileReader();
    reader.onload = (e) => {
      let text: any = reader.result;
      let primeiraLinha = text.split('\n').shift();
      this.lista = primeiraLinha.split(';');
    }
    reader.readAsText(file);
    this.arquivo = file;
  }


  enviar() {
    try {
      if (!this.arquivo) throw 'Selecione umarquivo para processar';
      this.comunic.confirmacao("Deseja realemnte enviar o arquivo?", () => {
        this.comunic.isCarregando(true);
        this.api.dadosUploadPost("educacao", "geral", this.arquivo).subscribe(() => {
          this.comunic.isCarregando(false);
          this.comunic.alerta('Arquivo enviado com sucesso');
          this.inputFile.files = null;
          (<HTMLInputElement>document.querySelector("#formFileLg")).value = "";
          this.arquivo = null;
          this.lista = [];
          // this.processar();
          // this.comunic.navegarUrl('/educacao');
        })
      });
    } catch (error) {
      this.comunic.alerta(error);
    }
  }

  processar() {
    try {
      this.comunic.confirmacao("Deseja realemnte processar", () => {
        this.comunic.isCarregando();
        this.api.dadosProcessarPost("educacao").subscribe(() => {
          this.comunic.isCarregando(false);
          this.comunic.alerta('Arquivo processado com sucesso');
          this.comunic.navegarUrl('/educacao');
        })
      });
    } catch (error) {
      this.comunic.alerta(error);
    }
  }



}
