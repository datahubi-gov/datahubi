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
    public class MetricaController : ControllerBase
    {
        private readonly Data.Repositorio _rep;
        public MetricaController(Data.Repositorio rep)
        {
            _rep = rep;
        }

        [HttpGet]
        public ActionResult Get()
        {
            var lista = _rep.Metrica.Obter();
            return Ok(lista);
        }

        [HttpPost]
        public ActionResult Post(Models.Metrica model)
        {
            Models.Metrica registro;
            if (string.IsNullOrEmpty(model.Id)) //Inserir
            {
                registro = _rep.Metrica.Inserir(model);
            }
            else //Atualizar
            {
                _rep.Metrica.Atualizar(model.Id, model);
                return Ok(model);
            }
            return Ok(registro);
        }

        [HttpDelete]
        public ActionResult Delete(string id)
        {
            if (string.IsNullOrEmpty(id)) return BadRequest("Registro sem id informado");
            var registro = _rep.Metrica.Obter(id);
            if (id == null) return BadRequest("Registro sem não encontrado!");
            _rep.Metrica.Remover(registro);
            return Ok();
        }
    }
}