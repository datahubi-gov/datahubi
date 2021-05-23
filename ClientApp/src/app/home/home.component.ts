import { Component, Inject, OnInit } from '@angular/core';
import { ComunicService } from '../comunic.service';
import { DadosService } from '../shared/sdkcore';

declare global {
  interface Window {
    Apex: any;
  }
}

declare var listaGeral: any[];

// window.Apex = {
//   chart: {
//     toolbar: {
//       show: false
//     }
//   },
//   tooltip: {
//     shared: false
//   },
//   legend: {
//     show: false
//   }
// };

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

  public chartOptions: Partial<any>;
  public chartQuarterOptions: Partial<any>;

  constructor(
    @Inject(DadosService) public api: DadosService,
    @Inject(ComunicService) public comunic: ComunicService,
  ) {

  }

  ngOnInit() {
    let listaPromessa: Promise<any>[] = [];

    listaPromessa.push(
      this.api.dadosGet("fazenda", "totais").toPromise().then((r: any[]) => {
        // console.log('totais', r);
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
        let iptu = parseFloat(((iptu_previsao.valor / iptu_recebida.valor) * 100).toFixed(0));
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
        let lixo = parseFloat(((lixo_previsao.valor / lixo_recebida.valor) * 100).toFixed(0));
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
        let iss = parseFloat(((iss_previsao.valor / iss_recebida.valor) * 100).toFixed(0));
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
        let diversos = parseFloat(((convenios_previsao.valor / convenios_recebida.valor) * 100).toFixed(0));
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

    // *********************************************
    // *********** Barras - Comparativo  ***********
    // *********************************************

    listaPromessa.push(
      this.api.dadosGet("fazenda", "lancamentos").toPromise().then((r: any[]) => {
        listaGeral = r;
        let lista = r;
        r = r.filter(x => x.ano == 2020);
        console.log('lancamentos', r);
        this.comparativoMensal = {
          series: [
            {
              name: "IPTU",
              data: r.map(x => parseFloat(parseFloat(x.IPTU_SIM).toFixed(0)))
            },
            {
              name: "ISS",
              data: r.map(x => parseFloat(parseFloat(x.ISS_SIM).toFixed(0)))
            },
            {
              name: "Lixo",
              data: r.map(x => parseFloat(parseFloat(x.LIXO_SIM).toFixed(0)))
            },
            {
              name: "Taxas",
              data: r.map(x => parseFloat(parseFloat(x.TAXAS_SIM).toFixed(0)))
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
              text: "Arrecadação"
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



        this.chartOptions = {
          series: [
            {
              name: "ano",
              data: this.montarData(lista)
            }
          ],
          chart: {
            id: "barYear",
            height: 400,
            width: "100%",
            type: "bar",
            toolbar: {
              show: false
            },
            events: {
              dataPointSelection: (e, chart, opts) => {
                var quarterChartEl = document.querySelector("#chart-quarter");
                var yearChartEl = document.querySelector("#chart-year");

                if (opts.selectedDataPoints[0].length === 1) {
                  if (quarterChartEl.classList.contains("active")) {
                    this.updateQuarterChart(chart, "barQuarter");
                  } else {
                    yearChartEl.classList.add("chart-quarter-activated");
                    quarterChartEl.classList.add("active");
                    this.updateQuarterChart(chart, "barQuarter");
                  }
                } else {
                  this.updateQuarterChart(chart, "barQuarter");
                }

                if (opts.selectedDataPoints[0].length === 0) {
                  yearChartEl.classList.remove("chart-quarter-activated");
                  quarterChartEl.classList.remove("active");
                }
              },
              updated: (chart) => {
                this.updateQuarterChart(chart, "barQuarter");
              }
            }
          },          
          legend: {
            show: false
          },
          plotOptions: {
            bar: {
              distributed: true,
              horizontal: true,
              barHeight: "75%",
              dataLabels: {
                position: "bottom"
              }
            }
          },
          dataLabels: {
            enabled: true,
            textAnchor: "start",
            style: {
              colors: ["#fff"]
            },
            formatter: function (val, opt) {
              return opt.w.globals.labels[opt.dataPointIndex];
            },
            offsetX: 0,
            dropShadow: {
              enabled: true
            }
          },

          colors: this.colors,

          states: {
            normal: {
              filter: {
                type: "desaturate"
              }
            },
            active: {
              allowMultipleDataPointsSelection: true,
              filter: {
                type: "darken",
                value: 1
              }
            }
          },
          tooltip: {
            shared: false,
            x: {
              show: false
            },
            y: {
              title: {
                formatter: function (val, opts) {
                  return opts.w.globals.labels[opts.dataPointIndex];
                }
              }
            }
          },
          title: {
            text: "Resultado do ano",
            offsetX: 15
          },
          subtitle: {
            text: "(Click para mais detalhes)",
            offsetX: 15
          },
          yaxis: {
            labels: {
              show: false
            }
          }
        };

        this.chartQuarterOptions = {
          series: [
            {
              name: "meses",
              data: []
            }
          ],
          chart: {
            id: "barQuarter",
            height: 400,
            width: "100%",
            type: "bar",
            stacked: true
          },
          plotOptions: {
            bar: {
              columnWidth: "50%",
              horizontal: false
            }
          },
          legend: {
            show: false
          },
          grid: {
            yaxis: {
              lines: {
                show: false
              }
            },
            xaxis: {
              lines: {
                show: true
              }
            }
          },
          yaxis: {
            labels: {
              show: false
            }
          },
          title: {
            text: "Resultado do mês",
            offsetX: 10
          },
          tooltip: {
            x: {
              formatter: function (val, opts) {
                return opts.w.globals.seriesNames[opts.seriesIndex];
              }
            },
            y: {
              title: {
                formatter: function (val, opts) {
                  return opts.w.globals.labels[opts.dataPointIndex];
                }
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

  public colors = [
    "#008FFB",
    "#00E396",
    "#FEB019",
    "#FF4560",
    "#775DD0",
    "#00D9E9",
    "#FF66C3", '#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6',
    '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
    '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A',
    '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
    '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC',
    '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
    '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680',
    '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
    '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3',
    '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'
  ];

  public arrayData = [
    {
      y: 400,
      quarters: [
        {
          x: "Q1",
          y: 120
        },
        {
          x: "Q2",
          y: 90
        },
        {
          x: "Q3",
          y: 100
        },
        {
          x: "Q4",
          y: 90
        }
      ]
    },
    {
      y: 430,
      quarters: [
        {
          x: "Q1",
          y: 120
        },
        {
          x: "Q2",
          y: 110
        },
        {
          x: "Q3",
          y: 90
        },
        {
          x: "Q4",
          y: 110
        }
      ]
    },
    {
      y: 448,
      quarters: [
        {
          x: "Q1",
          y: 70
        },
        {
          x: "Q2",
          y: 100
        },
        {
          x: "Q3",
          y: 140
        },
        {
          x: "Q4",
          y: 138
        }
      ]
    },
    {
      y: 470,
      quarters: [
        {
          x: "Q1",
          y: 150
        },
        {
          x: "Q2",
          y: 60
        },
        {
          x: "Q3",
          y: 190
        },
        {
          x: "Q4",
          y: 70
        }
      ]
    },
    {
      y: 540,
      quarters: [
        {
          x: "Q1",
          y: 120
        },
        {
          x: "Q2",
          y: 120
        },
        {
          x: "Q3",
          y: 130
        },
        {
          x: "Q4",
          y: 170
        }
      ]
    },
    {
      y: 580,
      quarters: [
        {
          x: "Q1",
          y: 170
        },
        {
          x: "Q2",
          y: 130
        },
        {
          x: "Q3",
          y: 120
        },
        {
          x: "Q4",
          y: 160
        }
      ]
    }
  ];


  public makeData(): any {
    var dataSet = this.arrayData;

    var dataYearSeries = [
      {
        x: "2011",
        y: dataSet[0].y,
        color: this.colors[0],
        quarters: dataSet[0].quarters
      },
      {
        x: "2012",
        y: dataSet[1].y,
        color: this.colors[1],
        quarters: dataSet[1].quarters
      },
      {
        x: "2013",
        y: dataSet[2].y,
        color: this.colors[2],
        quarters: dataSet[2].quarters
      },
      {
        x: "2014",
        y: dataSet[3].y,
        color: this.colors[3],
        quarters: dataSet[3].quarters
      },
      {
        x: "2015",
        y: dataSet[4].y,
        color: this.colors[4],
        quarters: dataSet[4].quarters
      },
      {
        x: "2016",
        y: dataSet[5].y,
        color: this.colors[5],
        quarters: dataSet[5].quarters
      }
    ];

    return dataYearSeries;
  }


  public updateQuarterChart(sourceChart, destChartIDToUpdate) {
    var series = [];
    var seriesIndex = 0;
    var colors = [];

    if (sourceChart.w.globals.selectedDataPoints[0]) {
      var selectedPoints = sourceChart.w.globals.selectedDataPoints;
      for (var i = 0; i < selectedPoints[seriesIndex].length; i++) {
        var selectedIndex = selectedPoints[seriesIndex][i];
        var yearSeries = sourceChart.w.config.series[seriesIndex];
        series.push({
          name: yearSeries.data[selectedIndex].x,
          data: yearSeries.data[selectedIndex].quarters
        });
        colors.push(yearSeries.data[selectedIndex].color);
      }

      if (series.length === 0)
        series = [
          {
            data: []
          }
        ];

      return window.ApexCharts.exec(destChartIDToUpdate, "updateOptions", {
        series: series,
        colors: colors,
        fill: {
          colors: colors
        }
      });
    }
  }

  public montarData(lista: any[]): any {
    let anos = this.comunic.uniqueArrayByProperty(lista, (x) => x.ano);
    let dados: any[] = [];
    anos.forEach((ano: any, index: string | number) => {
      dados.push({
        x: `${ano}`,
        y: lista.filter(x => x.ano == ano).map((x) => { return x.IPTU_SIM + x.ISS_SIM + x.LIXO_SIM + x.MULTA_SIM + x.TAXAS_SIM }).reduce((a, b) => a + b),
        color: this.colors[index],
        quarters: lista.filter(x => x.ano == ano).map(x => { return { x: x.mes, y: x.IPTU_SIM + x.ISS_SIM + x.LIXO_SIM + x.MULTA_SIM + x.TAXAS_SIM } })
      });
    });
    return dados;
  }


}
