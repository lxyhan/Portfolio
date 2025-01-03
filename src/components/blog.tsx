import React from 'react';
import { Calendar, ArrowUpRight } from 'lucide-react';

interface BlogPost {
  title: string;
  description: string;
  date: string;
  image: string;
  notionLink: string;
}

interface BlogCardProps {
  post: BlogPost;
}

const BlogCard: React.FC<BlogCardProps> = ({ post }) => (
  <div className="group relative flex gap-4 py-3 border-b border-gray-100 last:border-b-0">
    <div className="relative w-24 h-24 overflow-hidden rounded-md flex-shrink-0">
      <img
        src={post.image}
        alt={post.title}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
    </div>
    <div className="flex-1 min-w-0 flex flex-col justify-between">
      <div>
        <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-1">
          <Calendar className="w-3 h-3" />
          <time dateTime={post.date}>{post.date}</time>
        </div>
        <h3 className="text-sm font-medium text-gray-900 mb-1 line-clamp-1">
          {post.title}
        </h3>
        <p className="text-xs text-gray-600 line-clamp-2">
          {post.description}
        </p>
      </div>
      <div className="mt-1">
        <a
          href={post.notionLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-xs text-gray-900 hover:text-gray-600 transition-colors"
        >
          Read on Notion
          <ArrowUpRight className="w-3 h-3" />
        </a>
      </div>
    </div>
  </div>
);

const BlogSection: React.FC = () => {
  const posts: BlogPost[] = [
    {
      title: "On Distance Running: Reflections from the UofT Track",
      description: "An examination of endurance athletics through the lens of university running culture, exploring the intersection of physical capability and mental fortitude.",
      date: "2024-01-15",
      image: "/Running.JPG",
      notionLink: "https://notion.so/uoft-run-club"
    },
    {
      title: "A Technical Analysis of Close to Home: NewHacks 2024",
      description: "A methodological breakdown of our winning hackathon submission, examining the architectural decisions and technical challenges in developing a disaster response system.",
      date: "2024-01-02",
      image: "/Newhacks.png",
      notionLink: "https://notion.so/newhacks-reflection"
    }
  ];

  return (
    <section className="max-w-3xl mx-auto order-last xl:order-none">
      <div className="mb-4">
        <h2 className="text-lg font-medium text-gray-900 mb-1">
          Essays I wrote while procrastinating...
        </h2>
        <p className="text-sm text-gray-600">
          Selected writings on software design, athletics, and university life.
        </p>
      </div>
      <div className="divide-y divide-gray-100">
        {posts.map((post, i) => (
          <BlogCard key={i} post={post} />
        ))}
      </div>
    </section>
  );
};

export default BlogSection;