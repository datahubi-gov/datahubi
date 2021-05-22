import { Component, Inject, OnInit } from '@angular/core';
import { DadosService } from '../shared/sdkcore';

@Component({
  selector: 'app-educacao',
  templateUrl: './educacao.component.html',
  styleUrls: ['./educacao.component.css']
})
export class EducacaoComponent implements OnInit {

  public chartOptions: Partial<any> = {};
  public chartOptions2: Partial<any> = {};
  public PieOptions: Partial<any> = {};
  public PieOptions2: Partial<any> = {};
  public areaOptions: Partial<any> = {};

  public dadosCarregados: boolean = false;

  constructor(
    @Inject(DadosService) public api: DadosService
  ) { }

  ngOnInit(): void {

    let listaPromessa: Promise<any>[] = [];

    listaPromessa.push(
      this.api.dadosGet("educacao", "custoaluno").toPromise().then(r => {
        console.log('custoaluno', r);
      })
    );

    Promise.all(listaPromessa).then(() => {

    });

    setTimeout(() => {
      this.dadosCarregados = true;


      this.chartOptions = {
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

      this.chartOptions2 = {
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

      // *************************

      this.PieOptions = {
        series: [15, 85],
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
        labels: ["Ocupação", "Capacidade"],
        responsive: []
      };

      this.PieOptions2 = {
        series: [2, 98],
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

      // *************************

      this.areaOptions = {
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
  }

}
