using MongoDB.Driver;
namespace Datahubi.Data.Colecoes
{
    public class Calculo : BaseCRUD<Models.Calculo>
    {
        public Calculo(IMongoCollection<Models.Calculo> model) : base(model) { }
    }
}