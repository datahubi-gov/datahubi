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

  public campos: any[] = [
    { nome: 'ano', campo: 'Ano', nomeCampo: 'ano', tipo: 'any' },
    { nome: 'mes', campo: 'Mês', nomeCampo: 'mês', tipo: 'número' },
    { nome: 'escola', campo: 'Escola - identificador', nomeCampo: 'escola', tipo: 'texto' },
    { nome: 'tipo', campo: 'Tipo', nomeCampo: 'categoria', tipo: 'categoria' },
    { nome: 'qtd_discente_efetivo', campo: 'Quant. professores efetio', nomeCampo: 'qtdProfEfetivo', tipo: 'número' },
    { nome: 'qtd_discente_contrato', campo: 'Quant. professores contrato', nomeCampo: 'qtdProfContrato', tipo: 'número' },
    { nome: 'despesa_discente', campo: 'Despesa professores', nomeCampo: 'despesaProfessor', tipo: 'número' },
    { nome: 'despesa_administrativo', campo: 'Despesa servidores', nomeCampo: 'despesaServidor', tipo: 'número' },
    { nome: 'despesa_geral', campo: 'Despesa geral', nomeCampo: 'despesaGeral', tipo: 'número' },
    { nome: 'despesa', campo: 'Total de Despesa', nomeCampo: 'despesaTotal', tipo: 'número' },
  ];

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
