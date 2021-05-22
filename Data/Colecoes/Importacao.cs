using MongoDB.Driver;
namespace Datahubi.Data.Colecoes
{
    public class Importacao : BaseCRUD<Models.Importacao>
    {
        public Importacao(IMongoCollection<Models.Importacao> model) : base(model) { }
    }
}