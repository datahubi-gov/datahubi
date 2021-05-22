src_base = '../dados/educacao'
dst_base = '../dadosprocessados/educacao'

salvar = True

src_escolas = f'{src_base}/dados_seduc_escolas.csv'
src_despesas = f'{src_base}/dados_seduc_despesas.csv'
src_discentes = f'{src_base}/dados_seduc_discentes.csv'
src_doscentes = f'{src_base}/dados_seduc_doscentes.csv'

# from bairrosgeo import bairros
import pandas as pd

alunos = pd.read_csv(src_doscentes,sep=";")
professores = pd.read_csv(src_discentes,sep=";")
escolas = pd.read_csv(src_escolas,sep=";")

despesas = pd.read_csv(src_despesas,sep=";")

totais = pd.DataFrame(columns=["indicador","qtd"])

total_alunos  = alunos.loc[(alunos['desistiu'] == 'NAO'),'id'].count()
total_professores = professores['id'].count()

totais = totais.append({'indicador':'total_alunos','qtd':total_alunos},ignore_index = True)
totais = totais.append({'indicador':'total_alunos_desistencia_2019','qtd':alunos.loc[(alunos['desistiu'] == 'SIM') & (alunos['ano_desistencia'] == 2019),'id'].count()},ignore_index = True)
totais = totais.append({'indicador':'total_alunos_desistencia_2020','qtd':alunos.loc[(alunos['desistiu'] == 'SIM') & (alunos['ano_desistencia'] == 2020),'id'].count()},ignore_index = True)
totais = totais.append({'indicador':'total_professores','qtd':total_professores},ignore_index = True)
totais = totais.append({'indicador':'total_escolas','qtd':escolas.loc[escolas['tipo'] == 'Escola','id'].count()},ignore_index = True)
totais = totais.append({'indicador':'total_creches','qtd':escolas.loc[escolas['tipo'] == 'CEI','id'].count()},ignore_index = True)
totais = totais.append({'indicador':'total_despesas_2019','qtd':despesas.loc[despesas['ano'] == 2019,'despesa'].sum()},ignore_index = True)
totais = totais.append({'indicador':'total_despesas_2020','qtd':despesas.loc[despesas['ano'] == 2020,'despesa'].sum()},ignore_index = True)
totais = totais.append({'indicador':'capacidade','qtd':escolas['capacidade'].sum()},ignore_index = True)
totais = totais.append({'indicador':'total_alunos_inativo','qtd':alunos.loc[(alunos['desistiu'] == 'SIM'),'id'].count()},ignore_index = True)
totais = totais.append({'indicador':'ociosidade','qtd':total_alunos/total_professores},ignore_index = True)
totais = totais.append({'indicador':'ociosidade_parametro','qtd':20},ignore_index = True)



if(salvar):
    totais.to_json(f'{dst_base}/totais.json',orient="records")



##############################################
###### Evasão Escolar po Mês #################
##############################################

evasao = alunos.loc[(alunos['desistiu'] == 'SIM')].groupby(['ano_desistencia','mes_desistencia'])['id'].count().reset_index()
evasao.columns = ['ano','mes','total']

if(salvar):
    evasao.to_json(f'{dst_base}/evasao.json',orient="records")


##############################################
###### Custo por Aluno #######################
##############################################

#total_alunos
custo_aluno = despesas.groupby(['ano','mes'])['despesa'].sum().reset_index()
custo_aluno['despesa'] = round(custo_aluno['despesa'] * 1,2)
custo_aluno['por_aluno'] = round(custo_aluno['despesa'] / total_alunos,2)

if(salvar):
    custo_aluno.to_json(f'{dst_base}/custoaluno.json',orient="records")


##############################################
###### Custo por Aluno #######################
##############################################

relacao_custo = despesas.groupby(['ano','mes'])[['despesa_discente','despesa_administrativo','despesa_geral','despesa']].sum().reset_index()

if(salvar):
    relacao_custo.to_json(f'{dst_base}/relacao_custo.json',orient="records")

# print()



