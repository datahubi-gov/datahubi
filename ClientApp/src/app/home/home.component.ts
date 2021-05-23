import { Component, Inject, OnInit } from '@angular/core';
import { ComunicService } from '../comunic.service';
import { DadosService } from '../shared/sdkcore';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {

  public dadosCarregados: boolean = false;
  public comparativoMensal: Partial<any> = {};
  public iptuPie: Partial<any> = {};
  public lixoPie: Partial<any> = {};
  public issPie: Partial<any> = {};
  public diversosPie: Partial<any> = {};
  public valorPrevisto: number = 0;
  public valorArrecadado: number = 0;

  constructor(
    @Inject(DadosService) public api: DadosService,
    @Inject(ComunicService) public comunic: ComunicService,
  ) {
  }

  ngOnInit() {
    let listaPromessa: Promise<any>[] = [];

    listaPromessa.push(
      this.api.dadosGet("fazenda", "totais").toPromise().then((r: any[]) => {
        console.log('totais', r);
        // Indicadores Totalizadores
        let item = r.find(x => x.indicador == 'receita_prevista');
        if (item) this.valorPrevisto = item.valor;
        item = r.find(x => x.indicador == 'receita_recebida');
        if (item) this.valorArrecadado = item.valor;


        // *********************************************
        // *********** IPTU ****************************
        // *********************************************

        let iptu_previsao = r.find(x => x.indicador == 'iptu_previsao');
        let iptu_recebida = r.find(x => x.indicador == 'iptu_recebida');
        let iptu = parseFloat((( iptu_previsao.valor/iptu_recebida.valor) * 100).toFixed(0));
        this.iptuPie = {
          series: [iptu, 100 - iptu],
          chart: {
            type: "pie"
          },
          legend: {
            show: false
          },
          dataLabels: {
            enabled: false
          },
          labels: ["Arrecadado", "Pendente"],
          responsive: []
        };

        // *********************************************
        // *********** Lixo ****************************
        // *********************************************

        let lixo_previsao = r.find(x => x.indicador == 'lixo_previsao');
        let lixo_recebida = r.find(x => x.indicador == 'lixo_recebida');
        let lixo = parseFloat((( lixo_previsao.valor/lixo_recebida.valor) * 100).toFixed(0));
        this.lixoPie = {
          series: [lixo, 100 - lixo],
          chart: {
            type: "pie"
          },
          legend: {
            show: false
          },
          dataLabels: {
            enabled: false
          },
          labels: ["Arrecadado", "Pendente"],
          responsive: []
        };

        // *********************************************
        // *********** ISS *****************************
        // *********************************************
        
        let iss_previsao = r.find(x => x.indicador == 'iss_previsao');
        let iss_recebida = r.find(x => x.indicador == 'iss_recebida');
        let iss = parseFloat((( iss_previsao.valor/iss_recebida.valor) * 100).toFixed(0));
        this.issPie = {
          series: [iss, 100 - iss],
          chart: {
            type: "pie"
          },
          legend: {
            show: false
          },
          dataLabels: {
            enabled: false
          },
          labels: ["Arrecadado", "Pendente"],
          responsive: []
        };

        // *********************************************
        // *********** Convênios ***********************
        // *********************************************
        
        let convenios_previsao = r.find(x => x.indicador == 'convenios_previsao');
        let convenios_recebida = r.find(x => x.indicador == 'convenios_recebida');
        let diversos = parseFloat((( convenios_previsao.valor/convenios_recebida.valor) * 100).toFixed(0));
        this.diversosPie = {
          series: [diversos, 100 - diversos],
          chart: {
            type: "pie"
          },
          legend: {
            show: false
          },
          dataLabels: {
            enabled: false
          },
          labels: ["Arrecadado", "Pendente"],
          responsive: []
        };

      }));



    Promise.all(listaPromessa).then(() => {
      setTimeout(() => {
        this.dadosCarregados = true;
      }, 600);
    });

  }
}
