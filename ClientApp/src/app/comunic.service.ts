import { Inject, Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ComunicService {

  constructor(
    @Inject(Router) private router: Router,
    @Inject(ActivatedRoute) private route: ActivatedRoute
  ) { }

  public uniqueArrayByProperty(array, callback) {
    return array.reduce((prev, item) => {
      const v = callback(item);
      if (!prev.includes(v)) prev.push(v)
      return prev
    }, [])
  }

  public carregando: boolean = false;

  public isCarregando(mostrar: boolean = true) {
    this.carregando = mostrar;
  }


  public alerta(msg: string) {
    alert(msg);
  }

  public confirmacao(pergunta: string, sim: Function = null, nao: Function = null) {
    if (confirm(pergunta)) {
      if (sim) sim();
    }
    else {
      if (nao) nao();
    }
  }

  public navegar(rota: string[] = ['/'], rotaRelativa: ActivatedRoute = null): Promise<any> {
    return this.router.navigate(rota, { relativeTo: rotaRelativa || this.route });
  }

  public navegarQuery(rota: string[] = ['/'], params: any = {}): Promise<any> {
    return this.router.navigate(rota, { queryParams: params });
  }

  public navegarUrl(rota: string = '/'): Promise<any> {
    return this.router.navigateByUrl(rota);
  }
}
