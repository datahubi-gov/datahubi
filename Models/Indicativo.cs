
using System.Collections.Generic;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Datahubi.Models
{
    public class Indicativo : BaseModel
    {
        public string nome { get; set; }
        [BsonRepresentation(BsonType.ObjectId)]
        public string areaId { get; set; }
        public Area area { get; set; }
        public IList<CampoIndicativo> campos { get; set; }
    }

    public class CampoIndicativo
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public virtual string Id { get; set; }
        [BsonRepresentation(BsonType.ObjectId)]
        public string metricaId { get; set; }
        public string campo { get; set; }
    }
}