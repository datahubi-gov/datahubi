using MongoDB.Driver;
namespace Datahubi.Data.Colecoes
{
    public class Indicativo : BaseCRUD<Models.Indicativo>
    {
        public Indicativo(IMongoCollection<Models.Indicativo> model) : base(model) { }
    }
}