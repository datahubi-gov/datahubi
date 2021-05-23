# DataHuBI - *A informação é o combustível do futuro!*

![DataHuBI](ClientApp/src/assets/img/logo.svg)

## Hackathon Cidade Empreendedora - Araguaína TO - 2021

### **Organização**: Prefeitura Municipal de Araguaína e SEBRAE/TO

* Primeiro commit - 21/05/2021 - 19:18

* WebSite: https://datahubi.com.br
 
# Tecnologias do projeto e pré-requisito

## Tecnologias
    dotnet Framework 5.0
    Angular 12 
    Python 3.9 (Libs: pandas, numpy, geopandas, faker)
    Banco de dados: MongoDB e arquivos CSV

## Pré-requisito
    Node.js 
    Angular CLI
    dotnet
    Python 3.9 (com conda ou pip)

# Funcionamento

O **dotnet framework 5.0** é responsavel em ser nosso backend e será a ponte para o **angular** consumir as informações. O Projeto está configurado com o swagger acessível na url: https://localhost:5001/swagger/index.html 

Ele também será o responsável pelo recebimento dos arquivos enviados e disparará os scripts em python que de fato irá manipular os dados e condensa as informações e exporta em arquivos no formato “.json” que novamente o dotnet entregará por meio da API.

Já o **python** será o responsável em gerar as informações utilizadas como referência, também será o responsável por processar cada indicativo com base no arquivo enviado e gerar os indicadores para que o backend possa entregar os dados no frontend.

Um ponto importante deste projeto são os scripts responsáveis pela a criação dos dados de amostra utilizados para demonstrar os gráficos e uma dificuldade foi criar dados não uniforme. Uma problemática muito grande em gerar amostra com funções de “random” é que elas não são tão aleatórias assim por ser utilizado calculo matemático para executar essa função e os gráficos em sua maioria acabam ficando muito “reto”. Depois de muita pesquisa resolvemos criar mecanismos para criar uma tendência nos dados para serem direcionados mais para uma categoria ou um período de tempo ou um bairro específico.
 

O **angular** será o frontend deste projeto onde manipulará os dados de apresentação no browser buscando e enviando os dados direto para a a api em **dotnet**.

# Rodar o projeto

Importante instalar os pré-requesitos. 

Em ambiente de desenvolvimento primeiro entre na pasta clienteApp e execute o comando abaixo que deverá iniciar o servidor que entregará a aplicação em angular no endereço http://localhost:4200/:
    
    cd ClientApp
    ng serve

Depois em outro terminal execute o comando abaixo para rodar a api e entregar o front em um unico endereço (https://localhost:5001/)

    dotnet run


O Python não executa nenhum serviço, e quando for necessário o dotnet executa os scripts necessários para processamento, mas para isso é necessário ter o python 3.9 instalado e as bibliotecas pandas, numpy, geopandas e faker.

O banco de dados MongoDB está conectado na nuvem da Atlas de forma gratuita e armazena apenas as informações estruturais

O Ambiente utilizado para desenvolvimento fou Windows mas pode ser executado em MacOS e Linux.