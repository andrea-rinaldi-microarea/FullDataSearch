using System.Collections.Generic;

namespace FullDataSearch.Models
{
    public class Node {
        public string Text { get; private set; }
        public List<Node> Nodes { get; private set;} = new List<Node>();

        public Node(string text)
        {
            Text = text;
        }
        
        public Node Add(string text)
        {
            Node n = new Node(text);
            Nodes.Add(n);
            return n;
        }
    }
}