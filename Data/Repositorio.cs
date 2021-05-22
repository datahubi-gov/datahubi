
using Microsoft.AspNetCore.Hosting;
using MongoDB.Driver;

namespace Datahubi.Data
{
    public class Repositorio
    {
        public IMongoDatabase database;

        public Colecoes.Area Area;
        public Colecoes.Calculo Calculo;
        public Colecoes.Importacao Importacao;
        public Colecoes.Indicativo Indicativo;
        public Colecoes.Metrica Metrica;

        public Repositorio(IDatabaseSettings settings, IWebHostEnvironment env)
        {
            System.Console.Write("Iniciando Repositório");
            var client = new MongoClient(settings.ConnectionString);
            database = client.GetDatabase(settings.DatabaseName);

            var _area = database.GetCollection<Models.Area>("Area");
            Area = new Colecoes.Area(_area);

            var _calculo = database.GetCollection<Models.Calculo>("Calculo");
            Calculo = new Colecoes.Calculo(_calculo);

            var _importacao = database.GetCollection<Models.Importacao>("Importacao");
            Importacao = new Colecoes.Importacao(_importacao);

            var _indicativo = database.GetCollection<Models.Indicativo>("Indicativo");
            Indicativo = new Colecoes.Indicativo(_indicativo);

            var _metrica = database.GetCollection<Models.Metrica>("Metrica");
            Metrica = new Colecoes.Metrica(_metrica);

            if (Area.Obter().Count <= 0)
            {
                Area.Inserir(new Models.Area() { nome = "Saúde", cor="blue" });
                Area.Inserir(new Models.Area() { nome = "Educação", cor="green" });
                Area.Inserir(new Models.Area() { nome = "ASTT", cor="yellon" });
            }
        }
    }
}