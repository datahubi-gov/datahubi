using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace Datahubi.Controllers
{
    
    [ApiController]
    [Route("[controller]")]
    public class ImportacaoController : ControllerBase
    {
        private readonly Data.Repositorio _rep;
        public ImportacaoController(Data.Repositorio rep)
        {
            _rep = rep;
        }

        [HttpGet]
        public ActionResult Get()
        {
            var lista = _rep.Importacao.Obter();
            return Ok(lista);
        }

        [HttpPost]
        public ActionResult Post(Models.Importacao model)
        {
            Models.Importacao registro;
            if (string.IsNullOrEmpty(model.Id)) //Inserir
            {
                registro = _rep.Importacao.Inserir(model);
            }
            else //Atualizar
            {
                _rep.Importacao.Atualizar(model.Id, model);
                return Ok(model);
            }
            return Ok(registro);
        }

        [HttpDelete]
        public ActionResult Delete(string id)
        {
            if (string.IsNullOrEmpty(id)) return BadRequest("Registro sem id informado");
            var registro = _rep.Importacao.Obter(id);
            if (id == null) return BadRequest("Registro sem não encontrado!");
            _rep.Importacao.Remover(registro);
            return Ok();
        }
    }
}