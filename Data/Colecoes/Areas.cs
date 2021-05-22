using MongoDB.Driver;
namespace Datahubi.Data.Colecoes
{
    public class Area : BaseCRUD<Models.Area>
    {
        public Area(IMongoCollection<Models.Area> model) : base(model) { }
    }
}