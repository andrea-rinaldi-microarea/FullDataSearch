using System;

namespace FullDataSearch.Models
{
    public class Entity {
        public string   Namespace { get; set; }
        public Guid     Id { get; set; }
        public string   Name { get; set; }
        public string   Description { get; set; }
    }
}
