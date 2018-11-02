using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using SampleData.Models;

namespace SampleData.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomersController : ControllerBase
    {
        private readonly Mago4Context _context;

        public CustomersController(Mago4Context context)
        {
            _context = context;
        }

        [HttpGet]
        public ActionResult<List<MaCustSupp>> GetAll()
        {
            return _context.MaCustSupp.Where(cs => cs.CustSuppType == 3211264).ToList();
        }

    }
}