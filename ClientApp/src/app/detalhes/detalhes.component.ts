import { Component, Inject, OnInit } from '@angular/core';
import { ComunicService } from '../comunic.service';
import { DadosService } from '../shared/sdkcore';
import { firstBy } from 'thenby';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.component.html',
  styleUrls: ['./detalhes.component.css']
})
export class DetalhesComponent implements OnInit {

  constructor(
    @Inject(DadosService) public api: DadosService,
    @Inject(ComunicService) public comunic: ComunicService,
  ) { }

  public lista: any[] = [];
  public textoDePesquisa: string = '';
  public textoDePesquisaTemp: string = '';
  public campoOrdenacao: string = 'nome';
  public direcao: SortOrder = 'asc';


  ngOnInit(): void {
    this.api.dadosGet('educacao', 'escolas').subscribe(x => {
      this.lista = x;
    });
  }

  public aplicarFiltros() {
    this.textoDePesquisa = this.textoDePesquisaTemp;
    console.log('pesquisa', this.textoDePesquisa);
  }

  mudarOrdem(campo) {
    if (campo != this.campoOrdenacao) {
      this.direcao = 'asc';
      this.campoOrdenacao = campo;
    } else {
      this.direcao = (this.direcao == 'asc') ? 'desc' : 'asc';
    }
    console.log('mudarOrderm', this.campoOrdenacao, this.direcao);

  }

  public get listaFiltrada(): any[] {
    let l = this.lista;
    if (this.textoDePesquisa) {
      l = l.filter(item => item.nome.toLocaleLowerCase().indexOf(this.textoDePesquisa.toLocaleLowerCase()) != -1);
    }
    return l.sort(firstBy(this.campoOrdenacao, this.direcao));
  }



}
