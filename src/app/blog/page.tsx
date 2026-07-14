import { BookOpen, Clock, ArrowRight, Tag } from "lucide-react";
import Link from "next/link";
import { db } from "@/db";
import { blogs } from "@/db/schema";
import { desc, eq } from "drizzle-orm";

export const metadata = {
  title: "Blog - Career Tips, Productivity & More",
  description: "Read educational articles about CV writing, presentations, typing skills, career development, and productivity. Updated regularly with fresh content.",
};

// Force dynamic rendering — don't query database at build time
export const dynamic = 'force-dynamic';

async function getBlogs() {
  try {
    const result = await db.select().from(blogs).where(eq(blogs.published, true)).orderBy(desc(blogs.createdAt));
    return result;
  } catch (error) {
    console.error("Blog query failed:", error);
    return [];
  }
}

export default async function BlogPage() {
  const allBlogs = await getBlogs();

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero */}
      <div className="bg-gradient-to-br from-orange-500 to-red-600 text-white py-16">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <BookOpen size={48} className="mx-auto mb-4 opacity-80" />
          <h1 className="text-4xl font-extrabold">Blog & Resources</h1>
          <p className="mt-3 text-orange-100 text-lg max-w-xl mx-auto">
            Tips, guides, and insights to help you succeed in your academic and professional journey.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-12">
        {allBlogs.length === 0 ? (
          <div className="text-center py-20">
            <BookOpen size={48} className="mx-auto text-slate-300 mb-4" />
            <p className="text-slate-500 text-lg mb-2">No blog posts yet.</p>
            <p className="text-sm text-slate-400">Blog posts are managed through the admin panel. Make sure your database is set up and blog posts have been added.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allBlogs.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                {post.coverImage ? (
                  <div className="h-48 bg-slate-200 overflow-hidden">
                    <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                  </div>
                ) : (
                  <div className="h-48 bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center">
                    <BookOpen size={48} className="text-white/40" />
                  </div>
                )}
                <div className="p-5">
                  {post.category && (
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-orange-600 bg-orange-50 px-2 py-1 rounded-full mb-3">
                      <Tag size={10} /> {post.category}
                    </span>
                  )}
                  <h2 className="font-bold text-lg mb-2 group-hover:text-orange-600 transition line-clamp-2">
                    {post.title}
                  </h2>
                  {post.excerpt && (
                    <p className="text-sm text-slate-500 mb-3 line-clamp-2">{post.excerpt}</p>
                  )}
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span className="flex items-center gap-1">
                      <Clock size={12} /> {new Date(post.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </span>
                    <span className="flex items-center gap-1 text-orange-500 font-medium group-hover:gap-2 transition-all">
                      Read More <ArrowRight size={12} />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
