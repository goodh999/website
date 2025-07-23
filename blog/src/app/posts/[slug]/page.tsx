import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';
import { notFound } from 'next/navigation';

interface PostMeta {
  title: string;
  date: string;
  category: string;
  tags: string[];
}

interface Props {
  params: { slug: string };
}

export default function PostPage({ params }: Props) {
  const postsDir = path.join(process.cwd(), 'src/app/posts');
  const filePath = path.join(postsDir, `${params.slug}.md`);
  if (!fs.existsSync(filePath)) {
    notFound();
  }
  const content = fs.readFileSync(filePath, 'utf-8');
  const { data, content: mdContent } = matter(content);
  const html = marked.parse(mdContent);
  const meta = data as PostMeta;

  return (
    <main>
      <h1>{meta.title}</h1>
      <p><small>{meta.date} | {meta.category} | {meta.tags.join(', ')}</small></p>
      <article dangerouslySetInnerHTML={{ __html: html }} />
      <a href="/">← 記事一覧へ戻る</a>
    </main>
  );
} 