// src/lib/markdown.ts
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import remarkGfm from 'remark-gfm';

const postsDirectory = path.join(process.cwd(), 'blog-posts');

export interface BlogPostData {
  slug: string;
  title: string;
  date: string;
  description: string;
  image: string;
  content?: string;
}

export async function getPostBySlug(slug: string): Promise<BlogPostData> {
  const realSlug = slug.replace(/\.md$/, '');
  const fullPath = path.join(postsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  
  const { data, content } = matter(fileContents);
  
  // Debug: Log the raw content
  console.log('Raw markdown content:', content.substring(0, 200));
  
  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(remarkGfm) // Adds support for GitHub Flavored Markdown
    .use(html, { sanitize: false }) // Don't sanitize to preserve all formatting
    .process(content);
    
  const contentHtml = processedContent.toString();
  
  // Debug: Log the processed HTML
  console.log('Processed HTML:', contentHtml.substring(0, 200));
  
  return {
    slug: realSlug,
    title: data.title || '',
    date: data.date || '',
    description: data.description || '',
    image: data.image || '',
    content: contentHtml
  };
}

export function getAllPosts(): BlogPostData[] {
  // Check if directory exists
  if (!fs.existsSync(postsDirectory)) {
    console.warn(`Blog posts directory not found: ${postsDirectory}`);
    return [];
  }
  
  const slugs = fs.readdirSync(postsDirectory);
  const posts = slugs
    .filter((slug) => slug.endsWith('.md'))
    .map((slug) => {
      const realSlug = slug.replace(/\.md$/, '');
      const fullPath = path.join(postsDirectory, slug);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data } = matter(fileContents);
      
      return {
        slug: realSlug,
        title: data.title || '',
        date: data.date || '',
        description: data.description || '',
        image: data.image || ''
      };
    })
    // Sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
    
  return posts;
}