
using Microsoft.AspNetCore.Hosting;
using MongoDB.Driver;

namespace Datahubi.Data
{
    public class Repositorio
    {
        public IMongoDatabase database;

        public Repositorio(IDatabaseSettings settings, IWebHostEnvironment env)
        {
            System.Console.Write("Iniciando Repositório");
            var client = new MongoClient(settings.ConnectionString);
            database = client.GetDatabase(settings.DatabaseName);
        }
    }
}