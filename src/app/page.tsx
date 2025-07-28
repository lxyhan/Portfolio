// src/app/page.tsx
import { Suspense } from 'react';
import { getAllPosts, getPostBySlug } from '@/lib/markdown';
import HomeClient from './home-client';

async function HomePage() {
  // Fetch all posts at build time
  const posts = getAllPosts();
  
  // Pre-fetch the content for all posts
  const postsWithContent = await Promise.all(
    posts.map(async (post) => {
      const fullPost = await getPostBySlug(post.slug);
      return fullPost;
    })
  );
  
  return <HomeClient posts={postsWithContent} />;
}

// Wrap in Suspense to handle useSearchParams
export default function Page() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center h-screen">
        <div className="text-gray-500">Loading...</div>
      </div>
    }>
      <HomePage />
    </Suspense>
  );
}