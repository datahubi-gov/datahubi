
using System.Collections.Generic;
using MongoDB.Driver;

namespace Datahubi.Data.Colecoes
{
    public class BaseCRUD<T>
    where T : Models.BaseModel, new()
    {
        public IMongoCollection<T> _tabela;
        public BaseCRUD(IMongoCollection<T> tabela)
        {
            _tabela = tabela;
        }


        public List<T> Obter() => _tabela.Find(registro => true).ToList();

        public List<T> Obter(System.Linq.Expressions.Expression<System.Func<T, bool>> filtro) => _tabela.Find(filtro).ToList();

        public T Obter(string id) => _tabela.Find<T>(book => book.Id == id).FirstOrDefault();

        public T Inserir(T registro)
        {
            _tabela.InsertOne(registro);
            return registro;
        }

        public async System.Threading.Tasks.Task<T> InserirAsync(T registro)
        {
            await _tabela.InsertOneAsync(registro);
            return registro;
        }

        public void Atualizar(string id, T registro) => _tabela.ReplaceOne(r => r.Id == id, registro);

        public void Remover(T registro) => _tabela.DeleteOne(r => r.Id == registro.Id);

        public void Remover(string id) => _tabela.DeleteOne(r => r.Id == id);
    }
}