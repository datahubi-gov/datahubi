
using System.Collections.Generic;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Datahubi.Models
{
    public class Importacao : BaseModel
    {
        public string nome { get; set; }
        [BsonRepresentation(BsonType.ObjectId)]
        public string indicativoId { get; set; }
        public Indicativo indicativo { get; set; }
        public IList<DicionarioCampos> campos { get; set; }
    }

    public class DicionarioCampos
    {
        /// <summary>
        /// Campo de referência da lista de indicativo
        /// </summary>
        /// <value></value>
        public string campo { get; set; }

        /// <summary>
        /// Campo do dado que vai ser importado
        /// </summary>
        /// <value></value>
        public string campoImportado { get; set; }
    }
}