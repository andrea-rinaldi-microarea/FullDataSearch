using FullDataSearch.Models;
using Microsoft.AspNetCore.Mvc;

namespace FullDataSearch.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class IndexController : ControllerBase
    {
        public IndexController()
        {
        }

        [HttpPost("add")]
        public IActionResult Add(IndexRequest request)
        {
            return NoContent();
        }
    }
}