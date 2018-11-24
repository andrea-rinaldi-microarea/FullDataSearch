using System;
using System.Collections.Generic;
using FullDataSearch.Models;
using Newtonsoft.Json;

namespace FullDataSearch.Services
{
    public class Indexer
    {
        HashSet<string> terms = new HashSet<string>(StringComparer.InvariantCultureIgnoreCase); //TODO culture ...;
        Trie trie = new Trie();

        public void Add(IndexRequest request)
        {
            foreach (TextData text in request.TextData) {
                if (text.Value == string.Empty)
                    continue;
                
                InsertText(text.Value, new Bookmark(request.Entity, text));
            }
        }

        public HashSet<string> IndexedTerms()
        {
            return terms;
        }

        public Node GetNodes()
        {
            Node root = new Node(trie.Root.Value.ToString());
            addChildren(root, trie.Root);
            var json = JsonConvert.SerializeObject(root);
            return root;
        }

        private void addChildren(Node node, TrieNode trieNode)
        {
            foreach (Bookmark b in trieNode.Bookmarks)
            {
                node.Add(string.Format("[{0}-{1} ; {2}={3}]", b.Entity.Name, b.Entity.Description, b.Context.Context, b.Context.Value));
            }

            foreach (TrieNode tn in trieNode.Children)
            {
                Node n = node.Add(tn.Value.ToString());
                addChildren(n, tn);
            }
        }

        private void InsertText(string text, Bookmark bm)
        {
            string[] words = CleanupAndSplit(text);

            foreach (string w in words)
            {
                string word = w.Trim();
                if (word.Length < 2)
                    continue;
                if (!terms.Contains(word))
                {
                    lock(terms)
                    {
                        terms.Add(word);
                    } 
                }
                lock(trie)
                {
                    trie.Insert(word, bm);
                }
            }
        }

       private string[] CleanupAndSplit(string text)
        {
            text = text.Replace(".", "");
            text = text.Replace("`", "");
            text = text.Replace("!", "");
            text = text.Replace("?", "");
            text = text.Replace("+", "");

            return text.Split(new Char[] { ' ', '-', ',', '"', '[', ']', '(', ')', '\'', '&', '<', '>', '/', '\\', '*', '°' });
        }

    }
}