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
    public class CalculoController : ControllerBase
    {
        private readonly Data.Repositorio _rep;
        public CalculoController(Data.Repositorio rep)
        {
            _rep = rep;
        }

        [HttpGet]
        public ActionResult Get()
        {
            var lista = _rep.Calculo.Obter();
            return Ok(lista);
        }

        [HttpPost]
        public ActionResult Post(Models.Calculo model)
        {
            Models.Calculo registro;
            if (string.IsNullOrEmpty(model.Id)) //Inserir
            {
                registro = _rep.Calculo.Inserir(model);
            }
            else //Atualizar
            {
                _rep.Calculo.Atualizar(model.Id, model);
                return Ok(model);
            }
            return Ok(registro);
        }

        [HttpDelete]
        public ActionResult Delete(string id)
        {
            if (string.IsNullOrEmpty(id)) return BadRequest("Registro sem id informado");
            var registro = _rep.Calculo.Obter(id);
            if (id == null) return BadRequest("Registro sem não encontrado!");
            _rep.Calculo.Remover(registro);
            return Ok();
        }
    }
}