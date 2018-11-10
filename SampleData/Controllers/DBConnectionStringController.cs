using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SampleData.Services;

namespace SampleData.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DBConnectionStringController : ControllerBase
    {
        private readonly DBConnectionString _dbconnectionstring;

        public DBConnectionStringController(DBConnectionString dbconnectionstring)
        {
            _dbconnectionstring =  dbconnectionstring;
        }

        // GET api/dbconnectionstring
        [HttpGet("isValid")]
        public ActionResult<bool> IsValid()
        {
            return _dbconnectionstring.IsValid();
        }

        // GET api/dbconnectionstring
        [HttpGet]
        public ActionResult<string> Get()
        {
            return _dbconnectionstring.Get();
        }

        // POST api/values
        [HttpPost]
        public IActionResult Post()
        {
            using (var reader = new StreamReader(Request.Body))
            {
                var newConnectionString = reader.ReadToEnd();
        
                _dbconnectionstring.Set(newConnectionString);
            }

            return NoContent();
        }
    }
}
