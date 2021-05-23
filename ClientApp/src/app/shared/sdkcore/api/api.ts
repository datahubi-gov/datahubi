export * from './area.service';
import { AreaService } from './area.service';
export * from './calculo.service';
import { CalculoService } from './calculo.service';
export * from './dados.service';
import { DadosService } from './dados.service';
export * from './importacao.service';
import { ImportacaoService } from './importacao.service';
export * from './indicativo.service';
import { IndicativoService } from './indicativo.service';
export * from './metrica.service';
import { MetricaService } from './metrica.service';
export const APIS = [AreaService, CalculoService, DadosService, ImportacaoService, IndicativoService, MetricaService];
