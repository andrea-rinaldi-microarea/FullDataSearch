using System;

namespace FullDataSearch.Models
{
    public class IndexRequest
    {
        public Guid Reference { get; set; }
        public string Context { get; set; }
        public string[] Sentences{ get; set; }
    }
}
