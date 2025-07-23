import Image from "next/image";
import styles from "./page.module.css";
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import PostCalendar from './PostCalendar';
import Link from 'next/link';

// 記事データ型
interface PostMeta {
  title: string;
  date: string;
  category: string;
  tags: string[];
  slug: string;
  content: string;
}

// 記事一覧取得関数
function getPosts(): PostMeta[] {
  const postsDir = path.join(process.cwd(), 'src/app/posts');
  const files = fs.readdirSync(postsDir);
  return files
    .filter((file) => fs.statSync(path.join(postsDir, file)).isFile()) // ファイルのみ対象
    .map((file) => {
      const filePath = path.join(postsDir, file);
      const content = fs.readFileSync(filePath, 'utf-8');
      const { data, content: mdContent } = matter(content);
      return {
        title: data.title,
        date: data.date,
        category: data.category,
        tags: data.tags,
        slug: file.replace(/\.md$/, ''),
        content: mdContent,
      };
    })
    .sort((a, b) => b.date.localeCompare(a.date));
}

export default function Home() {
  const allPosts = getPosts();
  return (
    <main>
      <h1>個人ブログ</h1>
      <p>趣味や思考を自由に綴るブログです。</p>
      {/* <SearchBox posts={allPosts} onResult={setPosts} /> */}
      <PostCalendar posts={allPosts} />
      <h2>記事一覧</h2>
      <ul>
        {allPosts.map((post) => (
          <li key={post.slug}>
            <Link href={`/posts/${post.slug}`}>{post.title}</Link> <br />
            <small>{post.date} | {post.category} | {post.tags.join(', ')}</small>
          </li>
        ))}
      </ul>
    </main>
  );
}
