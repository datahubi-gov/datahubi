using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Datahubi.Models
{
    public class BaseModel
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public virtual string Id { get; set; }
    }
}