using FullDataSearch.Models;
using FullDataSearch.Services;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace FullDataSearch.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class IndexController : ControllerBase
    {
        Indexer _indexer;
        public IndexController(Indexer indexer)
        {
            _indexer = indexer;
        }

        [HttpPost("add")]
        public IActionResult Add(IndexRequest request)
        {
            _indexer.Add(request);
            return NoContent();
        }

        [HttpGet("terms")]
        public ActionResult<HashSet<string>> Terms()
        {
            return _indexer.IndexedTerms();
        }

        [HttpGet("nodes")]
        public ActionResult<Node> GetNodes()
        {
            return _indexer.GetNodes();
        }

    }
}