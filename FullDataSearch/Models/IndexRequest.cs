using System;

namespace FullDataSearch.Models
{
    public class Entity {
        public string   Namespace { get; set; }
        public Guid     Id { get; set; }
        public string   Name { get; set; }
        public string   Description { get; set; }
    }

    public class TextData {
        public string Context { get; set; }
        public string Value { get; set; }
    }

    public class IndexRequest
    {
        public Entity Entity { get; set; }
        public TextData[] TextData{ get; set; }
    }
}
