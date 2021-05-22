import { Component, Inject, OnInit } from '@angular/core';
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
    @Inject(DadosService) public api: DadosService
  ) { }

  ngOnInit(): void {

    let listaPromessa: Promise<any>[] = [];

    listaPromessa.push(
      this.api.dadosGet("educacao", "totais").toPromise().then((r: any[]) => {
        console.log('totais', r);
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
      this.api.dadosGet("educacao", "evasao").toPromise().then(r => {
        console.log('evasao', r);
      })
    );
    listaPromessa.push(
      this.api.dadosGet("educacao", "relacao_custo").toPromise().then(r => {
        console.log('relacao_custo', r);
      })
    );
    listaPromessa.push(
      this.api.dadosGet("educacao", "custoaluno").toPromise().then(r => {
        console.log('custoaluno', r);
      })
    );

    Promise.all(listaPromessa).then(() => {
      setTimeout(() => {
        this.dadosCarregados = true;


        this.custoPorSegmento = {
          series: [
            {
              name: "Net Profit",
              data: [44, 55, 57, 56, 61, 58, 63, 60, 66]
            },
            {
              name: "Revenue",
              data: [76, 85, 101, 98, 87, 105, 91, 114, 94]
            },
            {
              name: "Free Cash Flow",
              data: [35, 41, 36, 26, 45, 48, 52, 53, 41]
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
            categories: [
              "Feb",
              "Mar",
              "Apr",
              "May",
              "Jun",
              "Jul",
              "Aug",
              "Sep",
              "Oct"
            ]
          },
          yaxis: {
            title: {
              text: "$ (thousands)"
            }
          },
          fill: {
            opacity: 1
          },
          tooltip: {
            y: {
              formatter: function (val) {
                return "$ " + val + " thousands";
              }
            }
          }
        };

        this.custoPorAluno = {
          series: [
            {
              name: "Custo por aluno",
              data: [44, 55, 57, 56, 61, 58, 63, 60, 66]
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
            categories: [
              "Feb",
              "Mar",
              "Apr",
              "May",
              "Jun",
              "Jul",
              "Aug",
              "Sep",
              "Oct"
            ]
          },
          yaxis: {
            title: {
              text: "$ (thousands)"
            }
          },
          fill: {
            opacity: 1
          },
          tooltip: {
            y: {
              formatter: function (val) {
                return "$ " + val + " thousands";
              }
            }
          }
        };






        this.evacaoEscolar = {
          series: [
            {
              name: "2018",
              data: [31, 40, 28, 51, 42, 109, 100]
            },
            {
              name: "2019",
              data: [11, 32, 45, 32, 34, 52, 41]
            },
            {
              name: "2020",
              data: [11, 48, 75, 32, 40, 22, 21]
            }
          ],
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
            type: "datetime",
            categories: [
              "2018-09-19T00:00:00.000Z",
              "2018-09-19T01:30:00.000Z",
              "2018-09-19T02:30:00.000Z",
              "2018-09-19T03:30:00.000Z",
              "2018-09-19T04:30:00.000Z",
              "2018-09-19T05:30:00.000Z",
              "2018-09-19T06:30:00.000Z"
            ]
          },
          tooltip: {
            x: {
              format: "dd/MM/yy HH:mm"
            }
          }
        };



      }, 600);
    });


  }

}
