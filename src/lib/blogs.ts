import fm from "front-matter";

export interface BlogPost {
  title: string;
  slug: string;
  date: string;
  readTime: string;
  tags: string[];
  summary: string;
  coverImage?: string;
  content: string;
}

interface FrontMatterAttributes {
  title?: string;
  slug?: string;
  date?: string;
  readTime?: string;
  tags?: string[];
  summary?: string;
  coverImage?: string;
}

// Vite glob import to dynamically read all markdown files from src/content/blogs/*.md
const markdownFiles = import.meta.glob("/src/content/blogs/*.md", {
  query: "?raw",
  eager: true,
});

export function getAllBlogs(): BlogPost[] {
  const posts: BlogPost[] = [];

  for (const path in markdownFiles) {
    const rawModule = markdownFiles[path] as unknown;
    let rawContent = "";

    if (typeof rawModule === "string") {
      rawContent = rawModule;
    } else if (
      rawModule &&
      typeof rawModule === "object" &&
      "default" in rawModule
    ) {
      rawContent = String((rawModule as { default: unknown }).default);
    }

    if (!rawContent) continue;

    const parsed = fm<FrontMatterAttributes>(rawContent);
    const attrs = parsed.attributes;

    // Fallback slug from filename if slug attribute is not provided
    const fallbackSlug = path.split("/").pop()?.replace(".md", "") || "post";

    posts.push({
      title: attrs.title || "Untitled Post",
      slug: attrs.slug || fallbackSlug,
      date: attrs.date || "2026-07-30",
      readTime: attrs.readTime || "3 min read",
      tags: attrs.tags || [],
      summary: attrs.summary || "",
      coverImage: attrs.coverImage,
      content: parsed.body,
    });
  }

  // Sort latest first
  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

export function getBlogBySlug(slug: string): BlogPost | undefined {
  const blogs = getAllBlogs();
  return blogs.find((post) => post.slug === slug);
}
