"use client";
import { useState } from "react";

interface PostMeta {
  title: string;
  date: string;
  category: string;
  tags: string[];
  slug: string;
  content: string;
}

export default function SearchBox({ posts, onResult }: { posts: PostMeta[], onResult: (results: PostMeta[]) => void }) {
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = query.toLowerCase();
    const results = posts.filter(post =>
      post.title.toLowerCase().includes(q) ||
      post.content.toLowerCase().includes(q) ||
      post.tags.some(tag => tag.toLowerCase().includes(q))
    );
    onResult(results);
  };

  return (
    <form onSubmit={handleSearch} style={{ marginBottom: 24 }}>
      <input
        type="text"
        placeholder="記事検索..."
        value={query}
        onChange={e => setQuery(e.target.value)}
        style={{ marginRight: 8, width: 200 }}
      />
      <button type="submit">検索</button>
    </form>
  );
} 