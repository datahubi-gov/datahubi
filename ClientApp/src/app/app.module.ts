import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { GraficoComponent } from './grafico/grafico.component';
import { EducacaoComponent } from './educacao/educacao.component';
import { DetalhesComponent } from './detalhes/detalhes.component';
import { ApiModule, Configuration } from './shared/sdkcore';
import { environment } from 'src/environments/environment';

export const apiConfig = new Configuration({
  apiKeys: {},
  basePath: environment.servidorDotnet
});

export function getApiConfig() {
  return apiConfig;
}

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    GraficoComponent,
    EducacaoComponent,
    DetalhesComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    ApiModule.forRoot(getApiConfig),
    HttpClientModule,
    FormsModule,
    NgApexchartsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'counter', component: CounterComponent },
      { path: 'fetch-data', component: FetchDataComponent },
      { path: 'educacao', component: EducacaoComponent },
      { path: 'detalhes', component: DetalhesComponent },
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
