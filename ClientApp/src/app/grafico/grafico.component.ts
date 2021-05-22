import { Component, Input, OnInit, Output, ViewChild } from '@angular/core';

import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexLegend,
  ApexStroke,
  ApexXAxis,
  ApexFill,
  ApexTooltip,
  ChartType,
  ApexNonAxisChartSeries,
  ApexResponsive
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;
};

export type PieOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
  legend: ApexLegend;
};

@Component({
  selector: 'grafico',
  templateUrl: './grafico.component.html',
  styleUrls: ['./grafico.component.scss']
})
export class GraficoComponent implements OnInit {

  //  declare type ChartType = "line" | "area" | "bar" | "histogram" | "pie" | "donut" | "radialBar" | "scatter" | "bubble" | "heatmap" | "candlestick" | "boxPlot" | "radar" | "polarArea" | "rangeBar" | "treemap";
  @Input() public tipo: ChartType = 'bar';

  @ViewChild("chart") chart: ChartComponent;

  @Input() public set opcoes(_opcoes: any) {
    setTimeout(() => {
      this.chartOptions = _opcoes;
    });
  }

  public chartOptions: any = {
    series: [],
    chart: {
      type: this.tipo
    }
  };


  constructor() { }

  uniqueArrayByProperty(array, callback) {
    return array.reduce((prev, item) => {
      const v = callback(item);
      if (!prev.includes(v)) prev.push(v)
      return prev
    }, [])
  }

  ngOnInit() {
    // setTimeout(() => {
    //   this.chartOptions = {
    //     series: [
    //       {
    //         name: "Net Profit",
    //         data: [44, 55, 57, 56, 61, 58, 63, 60, 66]
    //       },
    //       {
    //         name: "Revenue",
    //         data: [76, 85, 101, 98, 87, 105, 91, 114, 94]
    //       },
    //       {
    //         name: "Free Cash Flow",
    //         data: [35, 41, 36, 26, 45, 48, 52, 53, 41]
    //       }
    //     ],
    //     chart: {
    //       type: "bar",
    //       height: 350
    //     },
    //     plotOptions: {
    //       bar: {
    //         horizontal: false,
    //         columnWidth: "55%",
    //         // endingShape: "rounded"
    //       }
    //     },
    //     dataLabels: {
    //       enabled: false
    //     },
    //     stroke: {
    //       show: true,
    //       width: 2,
    //       colors: ["transparent"]
    //     },
    //     xaxis: {
    //       categories: [
    //         "Feb",
    //         "Mar",
    //         "Apr",
    //         "May",
    //         "Jun",
    //         "Jul",
    //         "Aug",
    //         "Sep",
    //         "Oct"
    //       ]
    //     },
    //     yaxis: {
    //       title: {
    //         text: "$ (thousands)"
    //       }
    //     },
    //     fill: {
    //       opacity: 1
    //     },
    //     tooltip: {
    //       y: {
    //         formatter: function (val) {
    //           return "$ " + val + " thousands";
    //         }
    //       }
    //     }
    //   };
    // }, 600);

  }

}
