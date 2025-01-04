// types/blog.ts
export interface BlogPost {
    title: string;
    description: string;
    date: string;
    image: string;
    contentPath: string;
  }
  
  export interface BlogSectionProps {
    selectedPost: BlogPost | null;
    onPostClick: (post: BlogPost) => void;
  }