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
    public class AreaController : ControllerBase
    {
        private readonly Data.Repositorio _rep;
        public AreaController(Data.Repositorio rep)
        {
            _rep = rep;
        }

        [HttpGet]
        public ActionResult Get()
        {
            var lista = _rep.Area.Obter();
            return Ok(lista);
        }

        [HttpPost]
        public ActionResult Post(Models.Area model)
        {
            Models.Area registro;
            if (string.IsNullOrEmpty(model.Id)) //Inserir
            {
                registro = _rep.Area.Inserir(model);
            }
            else //Atualizar
            {
                _rep.Area.Atualizar(model.Id, model);
                return Ok(model);
            }
            return Ok(registro);
        }

        [HttpDelete]
        public ActionResult Delete(string id)
        {
            if (string.IsNullOrEmpty(id)) return BadRequest("Registro sem id informado");
            var registro = _rep.Area.Obter(id);
            if (id == null) return BadRequest("Registro sem não encontrado!");
            _rep.Area.Remover(registro);
            return Ok();
        }
    }
}