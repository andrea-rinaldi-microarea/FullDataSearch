using System;

namespace FullDataSearch.Models
{
    public class IndexRequest
    {
        public Entity Entity { get; set; }
        public TextData[] TextData{ get; set; }
    }
}
