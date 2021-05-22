import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-educacao',
  templateUrl: './educacao.component.html',
  styleUrls: ['./educacao.component.css']
})
export class EducacaoComponent implements OnInit {

  public chartOptions: Partial<any> = {};
  public PieOptions: Partial<any> = {};
  public PieOptions2: Partial<any> = {};

  constructor() { }

  ngOnInit(): void {
    setTimeout(() => {
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

      // *************************

      this.PieOptions = {
        series: [5, 95],
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
        series: [5, 95],
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

    }, 1000);
  }

}
