using System;

namespace FullDataSearch.Models
{
        public class Bookmark
    {
        public Guid Reference { get; set; }
        public string Context { get; set; }

        public Bookmark(string context, Guid reference)
        {
            Context = context;
            Reference = reference;
        }
    }

}