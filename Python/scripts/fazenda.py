import os
dirname = os.path.dirname(__file__)

src_base = os.path.join(dirname,'../dados/fazenda')
dst_base = os.path.join(dirname,'../dadosprocessados/fazenda')

salvar = False

src_lancamentos = f'{src_base}/dados_sefaz_lancamentos.csv'

from datetime import datetime
# print('Iniciado', datetime.now())

# from bairrosgeo import bairros
import pandas as pd

##############################################
############## Totais ########################
##############################################


totais = pd.DataFrame(columns=["indicador","valor"])

totais = totais.append({'indicador':'receita_prevista','valor':522715743.64},ignore_index = True)
totais = totais.append({'indicador':'receita_recebida','valor':(522715743.64*.89)},ignore_index = True)
totais = totais.append({'indicador':'iptu_previsao','valor':(13800000)},ignore_index = True)
totais = totais.append({'indicador':'iptu_recebida','valor':(6074835)},ignore_index = True)
totais = totais.append({'indicador':'lixo_previsao','valor':(2328000)},ignore_index = True)
totais = totais.append({'indicador':'lixo_recebida','valor':(5295479)},ignore_index = True)
totais = totais.append({'indicador':'iss_previsao','valor':(15900000)},ignore_index = True)
totais = totais.append({'indicador':'iss_recebida','valor':(18419071)},ignore_index = True)
totais = totais.append({'indicador':'convenios_previsao','valor':(95268500)},ignore_index = True)
totais = totais.append({'indicador':'convenios_recebida','valor':(102312015)},ignore_index = True)

if(salvar):
    totais.to_json(f'{dst_base}/totais.json',orient="records")

lanc = pd.read_csv(src_lancamentos,sep=";")
lanc["vencimento"] = pd.to_datetime(lanc['vencimento'])
lanc['ano'] = pd.DatetimeIndex(lanc['vencimento']).year
lanc['mes'] = pd.DatetimeIndex(lanc['vencimento']).month

lanc_periodo_tipo = lanc.drop(columns=['id','bairro','vencimento','exercicio']).groupby(['ano','mes','tipo','pago']).sum()
lanc_periodo_tipo = lanc_periodo_tipo.unstack(level=-1).unstack().reset_index()
# lanc_periodo_tipo.columns = lanc_periodo_tipo.columns.get_level_values(2).str.cat(lanc_periodo_tipo.columns.get_level_values(1),sep='_')
lanc_periodo_tipo.columns = ['ano', 'mes', 'IPTU_NAO', 'ISS_NAO', 'LIXO_NAO', 'MULTA_NAO', 'TAXAS_NAO','IPTU_SIM', 'ISS_SIM', 'LIXO_SIM', 'MULTA_SIM', 'TAXAS_SIM']

if(salvar):
    lanc_periodo_tipo.to_json(f'{dst_base}/lancamentos.json',orient="records")

import pandas as pd
from bairrosgeo import bairros
import matplotlib.pyplot as plt

ba = bairros()
lanc = pd.read_csv(src_lancamentos,sep=";")
lanc["vencimento"] = pd.to_datetime(lanc['vencimento'])
lanc['ano'] = pd.DatetimeIndex(lanc['vencimento']).year

total_pago = lanc.loc[(lanc['ano']==2020) & (lanc['pago']=='SIM')].drop(columns=['id','vencimento','exercicio','tipo','pago','ano']).groupby('bairro').sum().reset_index()

df_mapa_pago = ba.merge(total_pago,how='left',left_on='bairro',right_on='bairro').drop(columns=['descricao'])

df_mapa_pago.plot(column='valor',legend=True,figsize=(22,16),cmap='PuBu',edgecolor='black',linewidth=0.2)

plt.savefig('../../wwwroot/imagens/mapa_fazenda.svg',format="svg")


# lanc_periodo_tipo = lanc_periodo_tipo
# .unstack(level=-1)
# print(lanc_periodo_tipo.head())
# print(lanc_periodo_tipo.columns.get_level_values(0))
# print(lanc_periodo_tipo.columns.get_level_values(1))
# print(lanc_periodo_tipo.columns.get_level_values(2))
# print(lanc_periodo_tipo)
