using System;
using System.Collections.Generic;
using FullDataSearch.Models;

namespace FullDataSearch.Services
{
    public class TrieNode
    {
        private TrieNode Parent { get; set; } = null;
        public List<TrieNode> Children { get; private set; } = new List<TrieNode>();
        public List<Bookmark> Bookmarks { get; private set; } = new List<Bookmark>();
        public char Value { get; private set; }

        // public string Entry
        // {
        //     get {

        //         // no bookmarks = no entries
        //         if (Bookmarks.Count == 0)
        //             return string.Empty;

        //         string result = Value.ToString();
        //         TrieNode n = Parent;
        //         while (n != null)
        //         {
        //             result = n.Value.ToString() + result;
        //             n = n.Parent;
        //         }

        //         // root has a fictious character
        //         if (result.Length > 1)
        //             return result.Substring(1);
        //         else
        //             return string.Empty;
        //     }
        // }

        public TrieNode(TrieNode parent, ref string word, Bookmark bookmark)
        {
            if (word.Length < 1)
                return;
            Value = char.ToLowerInvariant(word[0]);
            Parent = parent;
            Insert(ref word, bookmark);
        }

        public bool Match(string word)
        {
            if (word.Length <= 0)
              return false;
            
            return Match(word[0]);
        }

        public bool Match(char c)
        {
            return char.ToLowerInvariant(c) == Value;
        }

        public void Insert(ref string word, Bookmark bookmark)
        {
            if (word.Length < 2)
            {
                Bookmarks.Add(bookmark);
                return;
            }
            word = word.Substring(1);

            foreach (TrieNode n in Children)
            {
                if (n.Match(word))
                {
                    n.Insert(ref word, bookmark);
                    return;
                }
            }

            Children.Add(new TrieNode(this, ref word, bookmark));
        }

        public void GetBookmarks(string word, List<Bookmark> result)
        {
            foreach (Bookmark b in Bookmarks)
                result.Add(b);

            foreach (TrieNode n in Children)
                n.GetBookmarks(word, result);
        }

        public TrieNode ChildFor(char c)
        {
            foreach (TrieNode n in Children)
                if (n.Match(c))
                    return n;
            
            return null;
        }
    }

    public class Trie
    {
        private TrieNode root = null;

        public void Insert(string word, Bookmark bookmark)
        {
            string w = "@" + word; // provides a root character
            if (root == null)
                root = new TrieNode(null, ref w, bookmark);
            else
                root.Insert(ref w, bookmark);
        }

        public TrieNode Root
        {
            get { return root; }
        }

        public void Clear()
        {
            if (root != null)
                root.Children.Clear();
        }

        public List<Bookmark> Find(string word)
        {
            List<Bookmark> result = new List<Bookmark>();

            TrieNode current = root;

            foreach (char c in word)
            {
                current = current.ChildFor(c);

                if (current == null)
                    break;
            }

            if (current != null && current != root) 
                current.GetBookmarks(word, result);

            return result;
        }
    }
}