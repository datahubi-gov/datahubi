src_base = '../dados/educacao'
dst_base = '../dadosprocessados/educacao'

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


totais = totais.append({'indicador':'total_alunos','qtd':alunos['id'].count()},ignore_index = True)
totais = totais.append({'indicador':'total_alunos_desistencia_2019','qtd':alunos.loc[(alunos['desistiu'] == 'SIM') & (alunos['ano_desistencia'] == 2019),'id'].count()},ignore_index = True)
totais = totais.append({'indicador':'total_alunos_desistencia_2020','qtd':alunos.loc[(alunos['desistiu'] == 'SIM') & (alunos['ano_desistencia'] == 2020),'id'].count()},ignore_index = True)
totais = totais.append({'indicador':'total_professores','qtd':professores['id'].count()},ignore_index = True)
totais = totais.append({'indicador':'total_escolas','qtd':escolas.loc[escolas['tipo'] == 'Escola','id'].count()},ignore_index = True)
totais = totais.append({'indicador':'total_creches','qtd':escolas.loc[escolas['tipo'] == 'CEI','id'].count()},ignore_index = True)
totais = totais.append({'indicador':'total_despesas_2019','qtd':despesas.loc[despesas['ano'] == 2019,'despesa'].sum()},ignore_index = True)
totais = totais.append({'indicador':'total_despesas_2020','qtd':despesas.loc[despesas['ano'] == 2020,'despesa'].sum()},ignore_index = True)

totais.to_json(f'{dst_base}/totais.json',orient="records")


# print()


# totais = totais.append({'indicador':'total_escolas','qtd':escolas['id'].count()},ignore_index = True)
# totais.append(pd.DataFrame({"indicador":"alunos","qtd":5}))
# alunos['id'].count()
# a = pd.DataFrame({"indicador":"alunos","qtd":5})

# despesas['periodo'] = despesas.ano + '-' + despesas.mes
# despesas_agrupada = despesas.groupby('periodo');
# print(despesas.groupby('ano')['despesa'].sum())
# print(totais)


#  ano  mes    escola    tipo  qtd_discente_efetivo  qtd_discente_contrato   despesa
# 0  2019    1  17005582  Escola                     8                     20  70626.86
# 1  2019    2  17005582  Escola                    11                     26  92467.16
# 2  2019    3  17005582  Escola                    11                     26  92467.16
# 3  2019    4  17005582  Escola                    11                     26  92467.16
# 4  2019    5  17005582  Escola                    10                     24  85187.06




