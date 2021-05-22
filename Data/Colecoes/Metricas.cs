using MongoDB.Driver;
namespace Datahubi.Data.Colecoes
{
    public class Metrica : BaseCRUD<Models.Metrica>
    {
        public Metrica(IMongoCollection<Models.Metrica> model) : base(model) { }
    }
}