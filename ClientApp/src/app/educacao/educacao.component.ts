import { Component, Inject, OnInit } from '@angular/core';
import { ComunicService } from '../comunic.service';
import { DadosService } from '../shared/sdkcore';

@Component({
  selector: 'app-educacao',
  templateUrl: './educacao.component.html',
  styleUrls: ['./educacao.component.css']
})
export class EducacaoComponent implements OnInit {

  public custoPorSegmento: Partial<any> = {};
  public custoPorAluno: Partial<any> = {};
  public capacidadeXocupacao: Partial<any> = {};
  public mediaOciosidadeDiscente: Partial<any> = {};
  public evacaoEscolar: Partial<any> = {};
  public dadosCarregados: boolean = false;

  public totalProfessor: number = 0;
  public totalAluno: number = 0;
  public totalColaborador: number = 0;
  public totalEscolas: number = 0;
  public totalCreches: number = 0;

  constructor(
    @Inject(DadosService) public api: DadosService,
    @Inject(ComunicService) public comunic: ComunicService,
  ) { }

  ngOnInit(): void {

    let listaPromessa: Promise<any>[] = [];

    listaPromessa.push(
      this.api.dadosGet("educacao", "totais").toPromise().then((r: any[]) => {
        // console.log('totais', r);
        // Indicadores Totalizadores
        let item = r.find(x => x.indicador == 'total_alunos');
        if (item) this.totalAluno = item.qtd;
        item = r.find(x => x.indicador == 'total_professores');
        if (item) this.totalProfessor = item.qtd;
        if (item) this.totalColaborador = parseInt(`${item.qtd * 0.35}`);
        item = r.find(x => x.indicador == 'total_escolas');
        if (item) this.totalEscolas = item.qtd;
        item = r.find(x => x.indicador == 'total_creches');
        if (item) this.totalCreches = item.qtd;

        // Gráfico de Ociosidade
        let item_ociosidade = r.find(x => x.indicador == 'ociosidade');
        let item_ociosidade_parametro = r.find(x => x.indicador == 'ociosidade_parametro');
        let ocupacao = parseFloat(((item_ociosidade.qtd / item_ociosidade_parametro.qtd) * 100).toFixed(0));
        this.mediaOciosidadeDiscente = {
          series: [100 - ocupacao, ocupacao],
          chart: {
            heigth: 50,
            type: "pie"
          },
          legend: {
            //show: false
            position: "bottom"
          },
          dataLabels: {
            //enabled: false
          },
          labels: ["Percentual ocioso", "Percentual ativo"],
          responsive: []
        };

        // Gráfico de Ocupação
        let capacidade = r.find(x => x.indicador == 'capacidade');
        let ocupacaoVagas = parseFloat(((this.totalAluno / capacidade.qtd) * 100).toFixed(0));
        this.capacidadeXocupacao = {
          series: [100 - ocupacaoVagas, ocupacaoVagas],
          chart: {
            type: "pie"
          },
          legend: {
            //show: false
            position: "bottom"
          },
          dataLabels: {
            //enabled: false
          },
          labels: ["Disponível", "Ocupado"],
          responsive: []
        };



      })
    );
    listaPromessa.push(
      this.api.dadosGet("educacao", "evasao").toPromise().then((r: any[]) => {
        // console.log('evasao', r);

        let series: any[] = [];
        this.comunic.uniqueArrayByProperty(r, x => x.ano).forEach(ano => {
          series.push({
            name: ano,
            data: r.filter(x => x.ano == ano).map(x => x.total)
          });
        });


        this.evacaoEscolar = {
          series: series,
          chart: {
            height: 350,
            type: "area",
            toolbar: {
              show: false
            }
          },
          dataLabels: {
            enabled: false
          },
          stroke: {
            curve: "smooth"
          },
          xaxis: {
            type: "string",
            categories: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']
          },
          tooltip: {
            x: {
              format: "dd/MM/yy HH:mm"
            }
          }
        };

      })
    );
    listaPromessa.push(
      this.api.dadosGet("educacao", "relacao_custo").toPromise().then((r: any[]) => {
        // console.log('relacao_custo', r);

        r = r.filter(x => x.ano == 2020);

        this.custoPorSegmento = {
          series: [
            {
              name: "Professores",
              data: r.map(x => parseFloat(parseFloat(x.despesa_discente).toFixed(2)))
            },
            {
              name: "Servidores Adm.",
              data: r.map(x => parseFloat(parseFloat(x.despesa_administrativo).toFixed(2)))
            },
            {
              name: "Despesas Adm.",
              data: r.map(x => parseFloat(parseFloat(x.despesa_geral).toFixed(2)))
            }
          ],
          chart: {
            type: "bar",
            height: 350
          },
          plotOptions: {
            bar: {
              horizontal: false,
              columnWidth: "55%",
              // endingShape: "rounded"
            }
          },
          dataLabels: {
            enabled: false
          },
          stroke: {
            show: true,
            width: 2,
            colors: ["transparent"]
          },
          xaxis: {
            categories: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']
          },
          yaxis: {
            title: {
              text: "Despesas"
            }
          },
          fill: {
            opacity: 1
          },
          tooltip: {
            y: {
              formatter: function (val) {
                return "R$ " + val;
              }
            }
          }
        };
      })
    );
    listaPromessa.push(
      this.api.dadosGet("educacao", "custoaluno").toPromise().then((r: any[]) => {
        console.log('custoaluno', r);
        let series: any[] = [];
        this.comunic.uniqueArrayByProperty(r, x => x.ano).forEach(ano => {
          series.push({
            name: ano,
            data: r.filter(x => x.ano == ano).map(x => x.por_aluno)
          });
        });
        this.custoPorAluno = {
          series: series,
          chart: {
            type: "bar",
            height: 350
          },
          plotOptions: {
            bar: {
              horizontal: false,
              columnWidth: "55%",
              // endingShape: "rounded"
            }
          },
          dataLabels: {
            enabled: false
          },
          stroke: {
            show: true,
            width: 2,
            colors: ["transparent"]
          },
          xaxis: {
            categories: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']
          },
          yaxis: {
            title: {
              text: "Custo por aluno"
            }
          },
          fill: {
            opacity: 1
          },
          tooltip: {
            y: {
              formatter: function (val) {
                return "R$ " + val;
              }
            }
          }
        };

      })
    );

    Promise.all(listaPromessa).then(() => {
      setTimeout(() => {
        this.dadosCarregados = true;
      }, 600);
    });


  }

}
