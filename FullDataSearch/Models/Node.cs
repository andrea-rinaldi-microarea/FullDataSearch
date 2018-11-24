using System.Collections.Generic;

namespace FullDataSearch.Models
{
    public class Node {
        public string Text { get; private set; }
        public List<Node> Children { get; private set;} = new List<Node>();
        public bool Collapsed { get; set; } = true;
        public int Value { get; set; } = 0;

        public Node(string text)
        {
            Text = text;
        }
        
        public Node Add(string text)
        {
            Node n = new Node(text);
            Children.Add(n);
            return n;
        }
    }
}