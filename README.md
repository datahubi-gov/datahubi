# DataHuBI - *Informação para tomada de decisão*

![DataHuBI](ClientApp/src/assets/img/logo.svg)

* Primeiro commit - 21/05/2021 - 19:18

* WebSite: https://datahubi.com.br
 
 # Tecnologias do projeto e pré-requisito

## Tecnologias
    dotnet Framework 5.0
    Angular 12 
    Python 3.9 (Libs: pandas, numpy, geopandas, faker)
## Pré-requisito
    Node.js 
    Angular CLI
    dotnet
    Python 3.9 (com conda ou pip)

# Funcionamento

O **dotnet framework 5.0** é responsavel em ser nosso backend e será a ponte para o **angular** consumir as informações. O Projeto está configurado com o swagger acessível na url: https://localhost:5001/swagger/index.html

Já o **python** será o responsável em gerar as informações utilizadas como referência, também será o rresponsável por processar cada indicativo com baso no arquivo enviado e gerar os indicadores para que o backend possa entregar os dados no frontend

O angular será o frontend onde manipulará e enviará os dados para a api.

# Rodar o projeto

Importante instalar os pré-requesitos. 

Em ambiente de desenvolvimento primeiro entre na pasta clienteApp e execute o comando abaixo que deverá iniciar o servidor que entregará a aplicação em angular no endereço http://localhost:4200/:
    
    cd ClientApp
    ng serve

Depois em outro terminal execute o comando abaixo para rodar a api e entregar o front em um unico endereço (https://localhost:5001/)

    dotnet run


O Python não executa nenhum serviço, e quando for necessário o dotnet executa os scripts necessários para processamento.