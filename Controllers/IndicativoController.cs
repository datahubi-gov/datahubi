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
    public class IndicativoController : ControllerBase
    {
        private readonly Data.Repositorio _rep;
        public IndicativoController(Data.Repositorio rep)
        {
            _rep = rep;
        }

        [HttpGet]
        public ActionResult Get()
        {
            var lista = _rep.Indicativo.Obter();
            return Ok(lista);
        }

        [HttpPost]
        public ActionResult Post(Models.Indicativo model)
        {
            Models.Indicativo registro;
            if (string.IsNullOrEmpty(model.Id)) //Inserir
            {
                registro = _rep.Indicativo.Inserir(model);
            }
            else //Atualizar
            {
                _rep.Indicativo.Atualizar(model.Id, model);
                return Ok(model);
            }
            return Ok(registro);
        }

        [HttpDelete]
        public ActionResult Delete(string id)
        {
            if (string.IsNullOrEmpty(id)) return BadRequest("Registro sem id informado");
            var registro = _rep.Indicativo.Obter(id);
            if (id == null) return BadRequest("Registro sem não encontrado!");
            _rep.Indicativo.Remover(registro);
            return Ok();
        }
    }
}