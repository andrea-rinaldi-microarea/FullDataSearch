using System;
using System.Collections.Generic;
using FullDataSearch.Models;

namespace FullDataSearch.Services
{
    public interface IIndexer
    {
        void Add(IndexRequest request);
        HashSet<string> IndexedTerms();
    }

    public class Indexer : IIndexer
    {
        HashSet<string> terms = new HashSet<string>(StringComparer.InvariantCultureIgnoreCase); //TODO culture ...;
        public void Add(IndexRequest request)
        {
            Bookmark bm = new Bookmark(request.Context, request.Reference);

            foreach (string sentence in request.Sentences) {
                InsertText(sentence, bm);
            }
        }
        public HashSet<string> IndexedTerms()
        {
            return terms;
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
                    terms.Add(word);
                //trie.Insert(word, bm);
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