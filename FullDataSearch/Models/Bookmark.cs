using System;

namespace FullDataSearch.Models
{
    public class Bookmark
    {
        public Entity Entity { get; set; }
        public TextData Context { get; set; }

        public Bookmark(Entity entity, TextData context)
        {
            Entity = entity;
            Context = context;
        }
    }

}