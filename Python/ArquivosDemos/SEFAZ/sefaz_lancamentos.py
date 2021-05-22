import geopandas as gpd
import fiona
from unidecode import unidecode

gpd.io.file.fiona.drvsupport.supported_drivers['KML'] = 'rw'
bairros = gpd.read_file("../bairros.kml", driver='KML')
bairros["Name"] = bairros["Name"].str.upper().apply(unidecode).str.replace("BAIRRO","",regex=False).str.strip() # coloca em maiusculo e retira acentuação e remove a palavra bairro
bairros.columns = ['bairro', 'descricao', 'geometry'] # Renomeia as colunas


import numpy as np
import pandas as pd
import faker
fake = faker.Faker()
import datetime

# Adicionar Peso nos bairros
bairros["peso"] = 0.001 #Adicoina peso igual
bairros.loc[bairros["bairro"]=='CENTRO','peso'] =0.2
bairros.loc[bairros["bairro"]=='SAO JOAO','peso'] =0.15
bairros.loc[bairros["bairro"]=='ENTROCAMENTO','peso'] =0.15
bairros.loc[bairros["bairro"]=='SENADOR','peso'] =0.150000
bairros.loc[bairros["bairro"]=='ARAGUAINA SUL','peso'] =0.0499
bairros.loc[bairros["bairro"]=='CIMBA','peso'] =0.031
bairros.loc[bairros["bairro"]=='NOROESTE','peso'] =0.05
bairros.loc[bairros["bairro"]=='SETOR BRASIL','peso'] =0.05
bairros.loc[bairros["bairro"]=='SETOR ANHANGUERA','peso'] =0.05
bairros.loc[bairros["bairro"]=='JORGE IUNES','peso'] =0.0501

# Montar a lista fake
qtd = 50 #Quantidade de Registros
data_inicial = datetime.date(2020, 1, 1)
data_final = datetime.date(2020, 12, 31)
lista_tipos = ['IPTU','ISS','LIXO','MULTA', 'TAXAS']
lista_tipos_peso = [0.3,0.2,0.3,0.10,0.10]

def gerar_datas(qtd = 50):
    lista_mes = [1,2,3,4,5,6,7,8,9,10,11,12]
    lista_mes_peso = [0.15,0.1,0.05,0.05,0.05,0.1,0.1,0.05,0.05,0.05,0.16,0.09]
    lista_ano = [2020,2019,2018,2017,2016,2015]
    lista_ano_peso = [0.24,0.21,0.16,0.15,0.14,0.1]
    datas = pd.DataFrame({'mes':np.random.choice(lista_mes, qtd,p=lista_mes_peso),'ano':np.random.choice(lista_ano, qtd,p=lista_ano_peso)})
    datas['data'] = pd.to_datetime(datas["ano"].astype(str) + '-' + datas["mes"].astype(str) + '-01')
    return datas

ids = np.arange(start=1, stop=qtd+1, step=1)
ba = np.random.choice(bairros['bairro'], qtd,p=bairros.peso)
datas = gerar_datas(qtd)
tipos = np.random.choice(lista_tipos, qtd,p=lista_tipos_peso)
pago = np.random.choice(['SIM','NAO'], qtd,p=[0.6,0.4])
    
dados = pd.DataFrame({'id':ids,'bairro':ba,'vencimento':datas['data'],'exercicio':datas['ano'],'tipo':tipos,'pago':pago})

dados.vencimento = pd.to_datetime(dados.vencimento) # Comverte pra datetime
dados = dados.sort_values(by=['vencimento'])
dados = dados.set_index('id')
# dados.to_json('dados_astt.json',orient="records") #salva os registros
dados.to_csv('dados_sefaz_lancamentos.csv',sep=";") #salva os registros