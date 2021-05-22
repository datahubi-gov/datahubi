from numpy.random import choice, random
import pandas as pd
escolas = pd.read_csv('base/escolas_enderecos.csv',sep=';')
escolas = escolas[['Código','Nome','Bairro',]]
escolas.columns = ['id','nome','bairro']
escolas['tipo'] = 'Escola'
escolas = escolas.set_index('id')



ceis_nome = ["CEI MAria de Fatima Santos Oliveira", "CEI - Professora Edília Moraes Soares", "CEI Dona Joaquina Mota", "Creche Municipal Constantino Pacifico de Oliveira", "CEI São José Operario", "CEI - Centro Educacional Infantil", "CEI Dona Regina Siqueira Campos", "Centro Educ Infantil Mul Pedro Carreiro", "CEI Nossa Senhora dos Milagres", "Creche Mul Constantino Pacifico De Oliveira", "CEI Municipal Criança Feliz", "Centro Educ Infantil Mul Boanice Botelho Kalil", "Cei Municipal Elisabeth Alves Carvalho", "CEI Boanice Botelho Kalil", "C.E.I Municipal Otaerson Souza Lima", "Centro Educacional Infantil Vovô Jorge Frederico", "Centro Educ Infantil Mul Otaerson Souza Lima", "Centro Educ Infantil Mul Natalina Maria De Jesus", "CEI Vereador Arnon Ferreira Leal", "Creche Municipal William Castelo Branco Martins"]

import geopandas as gpd
import fiona
from unidecode import unidecode

gpd.io.file.fiona.drvsupport.supported_drivers['KML'] = 'rw'
bairros = gpd.read_file("../bairros.kml", driver='KML')
bairros["Name"] = bairros["Name"].str.upper().apply(unidecode).str.replace("BAIRRO","",regex=False).str.strip() # coloca em maiusculo e retira acentuação e remove a palavra bairro
bairros.columns = ['bairro', 'descricao', 'geometry'] # Renomeia as colunas


import numpy as np
import pandas as pd
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


ceis = pd.DataFrame({'id':np.arange(start=1, stop=len(ceis_nome)+1, step=1),'nome':ceis_nome, 'bairro':np.random.choice(bairros['bairro'], len(ceis_nome))}).set_index('id')
ceis['tipo'] = 'CEI'
lista_escolas = escolas.append(ceis)

lista_escolas['isEspecial'] = np.random.choice(["SIM","NAO"], len(lista_escolas),p=[0.3,0.7])
lista_escolas['capacidade'] = np.random.choice(np.arange(start=400, stop=1600, step=30), len(lista_escolas))

# Faltando adicionar capacidade e se possui atendimento especial

#Despesas
custo_dicente_efetivo = 3500.7
custo_dicente_contrato = 1500.3
custo_administrativo = 1800.2
diretor = 5346.46
pespesa_fixa = [450.93,743.35,259.60,1235.29]

#ID Escola, Mes, Ano, qtd_discente_efetivo, qtd_discente_contrato,qtd_administrativo,
lista_despesa = pd.DataFrame(columns=['escola','tipo','ano','mes','qtd_discente_efetivo'])

# Configurar Lista de Despesa de todos os meses
for index, row in lista_escolas.iterrows():
    if(row['tipo'] == 'Escola'):        
        lista_despesa = lista_despesa.append(pd.DataFrame({'escola':index,'tipo':row['tipo'],'ano':2020,'mes':np.arange(start=1, stop=13, step=1),'qtd_discente_efetivo':np.random.choice(np.arange(start=7, stop=15, step=1), 12)}))
    else:
        lista_despesa = lista_despesa.append(pd.DataFrame({'escola':index,'tipo':row['tipo'],'ano':2020,'mes':np.arange(start=1, stop=13, step=1),'qtd_discente_efetivo':np.random.choice(np.arange(start=3, stop=9, step=1), 12)}))

lista_despesa['qtd_discente_contrato'] = 0.0
condicao = lista_despesa['tipo'] == 'Escola'
lista_despesa.loc[condicao,'qtd_discente_contrato'] = lista_despesa.loc[condicao]['qtd_discente_efetivo'] * 2.3
condicao = lista_despesa['tipo'] == 'CEI'
lista_despesa.loc[condicao,'qtd_discente_contrato'] = lista_despesa.loc[condicao]['qtd_discente_efetivo'] * 1.7

lista_despesa['qtd_discente_contrato'] = lista_despesa['qtd_discente_contrato'].astype(float)
lista_despesa['qtd_discente_contrato'] = lista_despesa['qtd_discente_contrato'].round()

lista_despesa_2019 = lista_despesa.copy()
lista_despesa_2019['qtd_discente_efetivo'] = lista_despesa_2019['qtd_discente_efetivo'].astype(float)
lista_despesa_2019['qtd_discente_efetivo'] = round(lista_despesa_2019['qtd_discente_efetivo'] * 0.85,0)
lista_despesa_2019['qtd_discente_contrato'] = round(lista_despesa_2019['qtd_discente_contrato'] * 0.85,0)


lista_despesa_2019['ano'] = 2019
lista_despesa['qtd_discente_contrato'] = lista_despesa['qtd_discente_contrato'].astype(int)
lista_despesa['qtd_discente_efetivo'] = lista_despesa['qtd_discente_efetivo'].astype(int)
lista_despesa_2019['qtd_discente_contrato'] = lista_despesa_2019['qtd_discente_contrato'].astype(int)
lista_despesa_2019['qtd_discente_efetivo'] = lista_despesa_2019['qtd_discente_efetivo'].astype(int)

lista_despesa['despesa'] = (lista_despesa['qtd_discente_contrato'] * custo_dicente_contrato) + (lista_despesa['qtd_discente_efetivo'] * custo_dicente_efetivo) + diretor + ((lista_despesa['qtd_discente_contrato'] + lista_despesa['qtd_discente_efetivo'])*np.random.choice(pespesa_fixa,1))
lista_despesa_2019['despesa'] = (lista_despesa_2019['qtd_discente_contrato'] * custo_dicente_contrato) + (lista_despesa_2019['qtd_discente_efetivo'] * custo_dicente_efetivo) + diretor + ((lista_despesa_2019['qtd_discente_contrato'] + lista_despesa_2019['qtd_discente_efetivo'])*np.random.choice(pespesa_fixa,1))

lista_despesa = lista_despesa_2019.append(lista_despesa)

# print(lista_despesa_2019.head(1))



########################################################
######### Lista de Discentes ###########################
########################################################
#Campos:  id, escola, tipo (efetivo,contrato), salario, 

lista_discentes = pd.DataFrame(columns=['id','escola','tipo','salario'])

for index, row in lista_escolas.iterrows():
    qtd_profesor = round(row['capacidade']/18)
    lista_discentes = lista_discentes.append(pd.DataFrame({'id':0,'escola':index,'tipo':np.random.choice(["Efetivo","Contrato"], qtd_profesor,p=[0.4,0.6]),'salario':0.0}))

condicao = lista_discentes['tipo'] == 'Efetivo'
lista_discentes.loc[condicao,'salario'] = custo_dicente_efetivo

condicao = lista_discentes['tipo'] == 'Contrato'
lista_discentes.loc[condicao,'salario'] = custo_dicente_contrato

lista_discentes['id'] = np.arange(start=1, stop=len(lista_discentes)+1, step=1)

print(lista_discentes.groupby('escola')['id'].count())
print(lista_discentes.groupby('escola')['salario'].sum())
# print(lista_discentes)


########################################################
######### Lista de Docentes ############################
########################################################
#Campos:  id, escola, tipo (normal,especial) 

lista_doscentes = pd.DataFrame(columns=['id','escola','tipo','salario'])

for index, row in lista_escolas.iterrows():
    qtd_aluno = round(row['capacidade']*0.94)
    lista_doscentes = lista_doscentes.append(pd.DataFrame({'id':0,'escola':index,'tipo':np.random.choice(["Normal","Especial"], qtd_aluno,p=[0.95,0.05])}))

lista_doscentes['id'] = np.arange(start=1, stop=len(lista_doscentes)+1, step=1)
# print(lista_doscentes.groupby('escola')['id'].count())


lista_escolas.to_csv('dados_seduc_escolas.csv',sep=";") #salva os registros
lista_despesa.set_index(['ano','mes']).to_csv('dados_seduc_despesas.csv',sep=";") #salva os registros
lista_discentes.set_index('id').to_csv('dados_seduc_discentes.csv',sep=";") #salva os registros
lista_doscentes.set_index('id').to_csv('dados_seduc_doscentes.csv',sep=";") #salva os registros



#Defir

# print(lista_despesa)


# Montar a lista fake
# qtd = 50000 #Quantidade de Registros
# data_inicial = datetime.date(2020, 1, 1)
# data_final = datetime.date(2020, 12, 31)
# lista_tipos = ['IPTU','ISS','LIXO','MULTA', 'TAXAS']
# lista_tipos_peso = [0.3,0.2,0.3,0.10,0.10]

# def gerar_datas(qtd = 50):
#     lista_mes = [1,2,3,4,5,6,7,8,9,10,11,12]
#     lista_mes_peso = [0.15,0.1,0.05,0.05,0.05,0.1,0.1,0.05,0.05,0.05,0.16,0.09]
#     lista_ano = [2020,2019,2018,2017,2016,2015]
#     lista_ano_peso = [0.24,0.21,0.16,0.15,0.14,0.1]
#     datas = pd.DataFrame({'mes':np.random.choice(lista_mes, qtd,p=lista_mes_peso),'ano':np.random.choice(lista_ano, qtd,p=lista_ano_peso)})
#     datas['data'] = pd.to_datetime(datas["ano"].astype(str) + '-' + datas["mes"].astype(str) + '-01')
#     return datas

# ids = np.arange(start=1, stop=qtd+1, step=1)
# ba = np.random.choice(bairros['bairro'], qtd,p=bairros.peso)
# datas = gerar_datas(qtd)
# tipos = np.random.choice(lista_tipos, qtd,p=lista_tipos_peso)
# pago = np.random.choice(['SIM','NAO'], qtd,p=[0.6,0.4])
# valores = np.random.randint(low=45,high=1800,size=qtd)
    
# dados = pd.DataFrame({'id':ids,'bairro':ba,'vencimento':datas['data'],'exercicio':datas['ano'],'tipo':tipos,'pago':pago,'valor':valores})

# dados.vencimento = pd.to_datetime(dados.vencimento) # Comverte pra datetime
# dados = dados.sort_values(by=['vencimento'])
# dados = dados.set_index('id')
# # dados.to_json('dados_astt.json',orient="records") #salva os registros
# dados.to_csv('dados_sefaz_lancamentos.csv',sep=";") #salva os registros