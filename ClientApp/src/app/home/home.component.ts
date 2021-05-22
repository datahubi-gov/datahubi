import { Component } from '@angular/core';
import { ChartOptions } from '../grafico/grafico.component';
import { PieOptions } from '../grafico/grafico.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {

  public chartOptions: Partial<ChartOptions> = {};
  public PieOptions: Partial<PieOptions> = {};

  constructor() {
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
        series: [20, 80],
        chart: {
          
          type: "pie"
        },
        legend: {
          show: false
        },
        labels: ["IPTU", "Outros"],
        responsive: []
      };
  

    }, 1000);

  }
}
