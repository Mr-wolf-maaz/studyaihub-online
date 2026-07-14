import { BookOpen, Clock, ArrowLeft, Tag, Share2 } from "lucide-react";
import Link from "next/link";
import { db } from "@/db";
import { blogs } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";

// Force dynamic rendering — don't query database at build time
export const dynamic = 'force-dynamic';

async function getBlog(slug: string) {
  try {
    const result = await db.select().from(blogs).where(eq(blogs.slug, slug)).limit(1);
    return result[0] || null;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getBlog(slug);
  if (!post) return { title: "Post Not Found" };
  return {
    title: post.title,
    description: post.excerpt || post.title,
    openGraph: { title: post.title, description: post.excerpt || post.title, type: "article" },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getBlog(slug);
  if (!post) notFound();

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero */}
      <div className="bg-gradient-to-br from-orange-500 to-red-600 text-white py-16">
        <div className="max-w-3xl mx-auto px-4">
          <Link href="/blog" className="inline-flex items-center gap-1 text-orange-100 hover:text-white text-sm mb-6 transition">
            <ArrowLeft size={14} /> Back to Blog
          </Link>
          {post.category && (
            <span className="inline-flex items-center gap-1 text-xs font-medium text-orange-100 bg-white/20 px-2 py-1 rounded-full mb-4">
              <Tag size={10} /> {post.category}
            </span>
          )}
          <h1 className="text-3xl sm:text-4xl font-extrabold leading-tight">{post.title}</h1>
          <div className="mt-4 flex items-center gap-4 text-sm text-orange-100">
            <span className="flex items-center gap-1">
              <Clock size={14} /> {new Date(post.createdAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-12">
        <article className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10">
          {/* Markdown-like content rendering */}
          <div className="prose prose-slate max-w-none">
            {post.content.split("\n").map((line, i) => {
              if (line.startsWith("## ")) {
                return <h2 key={i} className="text-2xl font-bold mt-8 mb-3 text-slate-900">{line.replace("## ", "")}</h2>;
              }
              if (line.startsWith("### ")) {
                return <h3 key={i} className="text-xl font-bold mt-6 mb-2 text-slate-800">{line.replace("### ", "")}</h3>;
              }
              if (line.startsWith("- ")) {
                return <li key={i} className="ml-4 text-slate-700">{line.replace("- ", "")}</li>;
              }
              if (line.match(/^\d+\./)) {
                return <li key={i} className="ml-4 text-slate-700">{line.replace(/^\d+\.\s*/, "")}</li>;
              }
              if (line.trim() === "") {
                return <br key={i} />;
              }
              // Handle bold and italic inline
              const formatted = line
                .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                .replace(/\*(.*?)\*/g, '<em>$1</em>');
              return <p key={i} className="text-slate-700 leading-relaxed mb-2" dangerouslySetInnerHTML={{ __html: formatted }} />;
            })}
          </div>
        </article>

        <div className="mt-8 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 bg-orange-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-orange-700 transition"
          >
            <ArrowLeft size={16} /> Back to All Posts
          </Link>
        </div>
      </div>
    </div>
  );
}
