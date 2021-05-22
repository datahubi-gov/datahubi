
namespace Datahubi.Models
{
    public class Calculo : BaseModel
    {
        public string nome { get; set; }
        public string script { get; set; }
        public string parametrosEntrada { get; set; }
        public string arquivoSaida { get; set; }
    }
}