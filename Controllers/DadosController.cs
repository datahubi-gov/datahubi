using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace Datahubi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class DadosController : ControllerBase
    {
        string diretorioResultado = "Python/dadosprocessados/";
        private readonly Data.Repositorio _rep;
        public DadosController(Data.Repositorio rep)
        {
            _rep = rep;
        }

        [HttpGet]
        public ActionResult Get(string area, string resultado)
        {
            string arquivoSaida = diretorioResultado + area + "/" + resultado + ".json";
            var dados = System.IO.File.ReadAllBytes(arquivoSaida);
            var document = new System.IO.FileInfo(arquivoSaida);
            var cd = new System.Net.Mime.ContentDisposition
            {
                FileName = document.Name,
                Inline = false,
            };
            Response.Headers.Add("Content-Disposition", cd.ToString());
            return File(dados, "application/json");
        }



        [HttpPost("upload")]
        public async Task<ActionResult> PostUploadAsync(
                IFormFile arquivo,
                [FromQuery] string area,
                [FromQuery] string fonte,
                [FromServices] IHttpContextAccessor accessor,
                [FromServices] IWebHostEnvironment _environment)
        {
            if (arquivo.Length > 0)
            {
                try
                {
                    string diretorio = PreparaDiretorio(area, _environment);
                    string enderecoArquivo = Path.Combine(diretorio, arquivo.FileName);
                    using (FileStream filestream = System.IO.File.Create(enderecoArquivo))
                    {
                        await arquivo.CopyToAsync(filestream);
                        filestream.Flush();
                        return Ok(new { msg = "Arquivo enviado com sucesso" });
                    }
                }
                catch (Exception ex)
                {
                    return BadRequest(new { erro = ex.ToString() });
                }
            }
            else
            {
                return BadRequest(new { erro = "Ocorreu uma falha no envio do arquivo..." });
            }
        }

        [HttpPost("processar")]
        public ActionResult PostProcessar(
                [FromQuery] string area,
                [FromServices] IHttpContextAccessor accessor,
                [FromServices] IWebHostEnvironment _environment)
        {
            DateTime inicio = DateTime.Now;
            Process process = new Process();
            string arquivo = Path.Combine(_environment.ContentRootPath + @"\Python\scripts\", area + ".py") + " testeParam";
            process.StartInfo.FileName = "py"; //Executável do python
            process.StartInfo.Arguments = arquivo;
            process.StartInfo.UseShellExecute = false;
            process.StartInfo.RedirectStandardError = true; //Pega saída de erros
            process.StartInfo.RedirectStandardOutput = true; //Pega a saída        
            process.Start();

            StreamReader reader = process.StandardOutput;
            string output = reader.ReadToEnd();

            Console.WriteLine(output);

            process.WaitForExit();
            process.Close();

            return Ok(new { arquivo = arquivo, saida = output, inicio = inicio, fim = DateTime.Now });
        }

        private string PreparaDiretorio(string diretorio, IWebHostEnvironment _environment)
        {
            if (string.IsNullOrEmpty(diretorio)) diretorio = @"";
            if (diretorio == "/") diretorio = "";
            diretorio = diretorio.Replace("/", @"\").Replace("..", "");
            diretorio = Path.Combine(_environment.WebRootPath + $@"\..\Python\dados\", diretorio);
            if (!Directory.Exists(diretorio)) Directory.CreateDirectory(diretorio);
            return diretorio;
        }
    }
}