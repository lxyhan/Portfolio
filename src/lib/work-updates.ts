import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import remarkGfm from 'remark-gfm';
import type { WorkUpdate } from '@/types/work-update';

const markusDirectory = path.join(process.cwd(), 'public/Markus');
const pythontaDirectory = path.join(process.cwd(), 'public/PythonTA');

/**
 * Extract summary from markdown content (first paragraph after title)
 */
function extractSummary(content: string): string {
  const lines = content.split('\n');
  const summaryLines: string[] = [];
  let foundFirstHeading = false;
  
  for (const line of lines) {
    if (line.startsWith('#')) {
      foundFirstHeading = true;
      continue;
    }
    
    if (foundFirstHeading && line.trim()) {
      summaryLines.push(line.trim());
      if (summaryLines.join(' ').length > 150) break;
    }
    
    if (summaryLines.length > 0 && !line.trim()) break;
  }
  
  const summary = summaryLines.join(' ');
  return summary.length > 200 ? summary.substring(0, 200) + '...' : summary;
}

/**
 * Extract week number from filename or title
 */
function extractWeekInfo(filename: string, title: string): string {
  // Try to extract from filename first
  const filenameMatch = filename.match(/week\s*(\d+)/i);
  if (filenameMatch) {
    return `Week ${filenameMatch[1]}`;
  }
  
  // Try to extract from title
  const titleMatch = title.match(/week\s*(\d+)/i);
  if (titleMatch) {
    return `Week ${titleMatch[1]}`;
  }
  
  return filename.replace(/\.md$/, '');
}

/**
 * Get all work updates from a specific project directory
 */
function getUpdatesFromDirectory(
  directory: string,
  projectName: 'MarkUs' | 'PythonTA'
): WorkUpdate[] {
  if (!fs.existsSync(directory)) {
    console.warn(`Directory not found: ${directory}`);
    return [];
  }

  const files = fs.readdirSync(directory);
  
  return files
    .filter((file) => file.endsWith('.md') && fs.statSync(path.join(directory, file)).size > 0)
    .map((file) => {
      const fullPath = path.join(directory, file);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);
      
      // Extract title from frontmatter or first heading
      let title = data.title || '';
      if (!title) {
        const titleMatch = content.match(/^#\s+(.+)$/m);
        title = titleMatch ? titleMatch[1] : file.replace(/\.md$/, '');
      }
      
      const week = extractWeekInfo(file, title);
      const summary = data.summary || extractSummary(content);
      
      return {
        slug: file.replace(/\.md$/, '').toLowerCase().replace(/\s+/g, '-'),
        title,
        week,
        project: projectName,
        summary,
        date: data.date || '',
      };
    })
    .sort((a, b) => {
      // Sort by week number if available
      const weekA = parseInt(a.week.match(/\d+/)?.[0] || '0');
      const weekB = parseInt(b.week.match(/\d+/)?.[0] || '0');
      return weekB - weekA; // Descending order
    });
}

/**
 * Get all work updates from both projects
 */
export function getAllWorkUpdates(): WorkUpdate[] {
  const markusUpdates = getUpdatesFromDirectory(markusDirectory, 'MarkUs');
  const pythontaUpdates = getUpdatesFromDirectory(pythontaDirectory, 'PythonTA');
  
  return [...markusUpdates, ...pythontaUpdates];
}

/**
 * Get a single work update by slug and project
 */
export async function getWorkUpdateBySlug(
  slug: string,
  project: 'MarkUs' | 'PythonTA'
): Promise<WorkUpdate | null> {
  const directory = project === 'MarkUs' ? markusDirectory : pythontaDirectory;
  
  if (!fs.existsSync(directory)) {
    return null;
  }

  const files = fs.readdirSync(directory);
  const matchingFile = files.find((file) => {
    const fileSlug = file.replace(/\.md$/, '').toLowerCase().replace(/\s+/g, '-');
    return fileSlug === slug;
  });

  if (!matchingFile) {
    return null;
  }

  const fullPath = path.join(directory, matchingFile);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  // Extract title
  let title = data.title || '';
  if (!title) {
    const titleMatch = content.match(/^#\s+(.+)$/m);
    title = titleMatch ? titleMatch[1] : matchingFile.replace(/\.md$/, '');
  }

  const week = extractWeekInfo(matchingFile, title);
  const summary = data.summary || extractSummary(content);

  // Process markdown to HTML
  const processedContent = await remark()
    .use(remarkGfm)
    .use(html, { sanitize: false })
    .process(content);

  const contentHtml = processedContent.toString();

  return {
    slug,
    title,
    week,
    project,
    summary,
    date: data.date || '',
    content: contentHtml,
  };
}
