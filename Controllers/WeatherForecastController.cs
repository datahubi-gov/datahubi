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
    public class WeatherForecastController : ControllerBase
    {
        private readonly Data.Repositorio _rep;
        private readonly ILogger<WeatherForecastController> _logger;

        public WeatherForecastController(ILogger<WeatherForecastController> logger, Data.Repositorio rep)
        {
            _logger = logger;
            _rep = rep;
        }

        [HttpGet]
        public ActionResult Get()
        {
            return Ok(new { DateTime.Now, _rep.database.Settings });
        }
    }
}
