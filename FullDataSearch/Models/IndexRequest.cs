namespace FullDataSearch.Models
{
    public class IndexRequest
    {
        public string Reference { get; set; }
        public string Context { get; set; }
        public string[] Sentences{ get; set; }
    }
}
