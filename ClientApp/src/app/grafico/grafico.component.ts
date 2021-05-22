import { Component, Input, OnInit, Output, ViewChild } from '@angular/core';

import {
  ChartComponent,
  ChartType,
} from "ng-apexcharts";

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

  public chartOptions: any = {}

  constructor() { }

  uniqueArrayByProperty(array, callback) {
    return array.reduce((prev, item) => {
      const v = callback(item);
      if (!prev.includes(v)) prev.push(v)
      return prev
    }, [])
  }

  ngOnInit() {
    this.chartOptions = {
      series: [],
      chart: {
        type: this.tipo
      }
    };
  }

}
