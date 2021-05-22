export * from './area.service';
import { AreaService } from './area.service';
export * from './calculo.service';
import { CalculoService } from './calculo.service';
export * from './dados.service';
import { DadosService } from './dados.service';
export const APIS = [AreaService, CalculoService, DadosService];
