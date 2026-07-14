"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Plus, Trash2, Pencil, Save, X, LogOut, BookOpen, Eye, EyeOff,
  Loader2, ArrowLeft, LayoutDashboard, FileText,
} from "lucide-react";
import { useRouter } from "next/navigation";

interface Blog {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  coverImage: string | null;
  category: string | null;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

interface AdminUser {
  id: number;
  username: string;
}

export default function AdminDashboardPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Blog | null>(null);
  const [creating, setCreating] = useState(false);
  const [saving, setSaving] = useState(false);
  const [admin, setAdmin] = useState<AdminUser | null>(null);
  const router = useRouter();

  // Form state
  const [formTitle, setFormTitle] = useState("");
  const [formSlug, setFormSlug] = useState("");
  const [formExcerpt, setFormExcerpt] = useState("");
  const [formContent, setFormContent] = useState("");
  const [formCoverImage, setFormCoverImage] = useState("");
  const [formCategory, setFormCategory] = useState("");
  const [formPublished, setFormPublished] = useState(false);

  const generateSlug = (title: string) =>
    title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  const checkAuth = useCallback(() => {
    const token = localStorage.getItem("admin_token");
    const user = localStorage.getItem("admin_user");
    if (!token || !user) {
      router.push("/admin");
      return false;
    }
    setAdmin(JSON.parse(user));
    return true;
  }, [router]);

  const fetchBlogs = useCallback(async () => {
    try {
      const res = await fetch("/api/blogs");
      const data = await res.json();
      setBlogs(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (checkAuth()) fetchBlogs();
  }, [checkAuth, fetchBlogs]);

  const resetForm = () => {
    setFormTitle(""); setFormSlug(""); setFormExcerpt("");
    setFormContent(""); setFormCoverImage(""); setFormCategory("");
    setFormPublished(false); setEditing(null); setCreating(false);
  };

  const startEdit = (blog: Blog) => {
    setEditing(blog); setCreating(false);
    setFormTitle(blog.title); setFormSlug(blog.slug);
    setFormExcerpt(blog.excerpt || ""); setFormContent(blog.content);
    setFormCoverImage(blog.coverImage || ""); setFormCategory(blog.category || "");
    setFormPublished(blog.published);
  };

  const startCreate = () => {
    resetForm(); setCreating(true);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      if (editing) {
        const res = await fetch("/api/blogs", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: editing.id,
            title: formTitle, slug: formSlug, excerpt: formExcerpt,
            content: formContent, coverImage: formCoverImage,
            category: formCategory, published: formPublished,
          }),
        });
        if (!res.ok) throw new Error("Update failed");
      } else {
        const slug = formSlug || generateSlug(formTitle);
        const res = await fetch("/api/blogs", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: formTitle, slug, excerpt: formExcerpt,
            content: formContent, coverImage: formCoverImage,
            category: formCategory, published: formPublished,
          }),
        });
        if (!res.ok) throw new Error("Create failed");
      }
      resetForm();
      await fetchBlogs();
    } catch (err) {
      console.error(err);
      alert("Save failed. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this post?")) return;
    try {
      await fetch(`/api/blogs?id=${id}`, { method: "DELETE" });
      await fetchBlogs();
    } catch (err) {
      console.error(err);
    }
  };

  const togglePublish = async (blog: Blog) => {
    try {
      await fetch("/api/blogs", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: blog.id, published: !blog.published }),
      });
      await fetchBlogs();
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_user");
    router.push("/admin");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Loader2 className="animate-spin text-indigo-600" size={32} />
      </div>
    );
  }

  const showForm = creating || editing;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-4 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <LayoutDashboard size={24} className="text-indigo-600" />
            <div>
              <h1 className="text-xl font-bold">Admin Dashboard</h1>
              <p className="text-xs text-slate-500">Welcome, {admin?.username}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => router.push("/blog")}
              className="flex items-center gap-1 px-3 py-2 text-sm border border-slate-300 rounded-lg hover:bg-slate-50">
              <ArrowLeft size={14} /> View Blog
            </button>
            <button onClick={handleLogout}
              className="flex items-center gap-1 px-3 py-2 text-sm text-red-600 border border-red-300 rounded-lg hover:bg-red-50">
              <LogOut size={14} /> Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl border border-slate-200 p-4">
            <p className="text-2xl font-bold text-indigo-600">{blogs.length}</p>
            <p className="text-xs text-slate-500">Total Posts</p>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-4">
            <p className="text-2xl font-bold text-emerald-600">{blogs.filter((b) => b.published).length}</p>
            <p className="text-xs text-slate-500">Published</p>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-4">
            <p className="text-2xl font-bold text-yellow-600">{blogs.filter((b) => !b.published).length}</p>
            <p className="text-xs text-slate-500">Drafts</p>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-4">
            <p className="text-2xl font-bold text-purple-600">
              {new Set(blogs.map((b) => b.category).filter(Boolean)).size}
            </p>
            <p className="text-xs text-slate-500">Categories</p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Blog List */}
          <div className={`lg:w-1/2 ${showForm ? "hidden lg:block" : ""}`}>
            <div className="bg-white rounded-xl border border-slate-200 p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold flex items-center gap-2">
                  <FileText size={18} className="text-indigo-600" /> Blog Posts
                </h2>
                <button onClick={startCreate}
                  className="flex items-center gap-1 bg-indigo-600 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition">
                  <Plus size={14} /> New Post
                </button>
              </div>

              {blogs.length === 0 ? (
                <p className="text-center text-slate-400 py-8">No blog posts yet. Create your first one!</p>
              ) : (
                <div className="space-y-2 max-h-[70vh] overflow-y-auto">
                  {blogs.map((blog) => (
                    <div key={blog.id} className="border border-slate-200 rounded-lg p-3 hover:bg-slate-50 transition">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-sm truncate">{blog.title}</h3>
                          <p className="text-xs text-slate-400 mt-0.5">
                            /{blog.slug} · {blog.category || "Uncategorized"}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className={`text-xs px-1.5 py-0.5 rounded ${blog.published ? "bg-emerald-100 text-emerald-700" : "bg-yellow-100 text-yellow-700"}`}>
                              {blog.published ? "Published" : "Draft"}
                            </span>
                            <span className="text-xs text-slate-400">
                              {new Date(blog.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <button onClick={() => togglePublish(blog)}
                            title={blog.published ? "Unpublish" : "Publish"}
                            className="p-1.5 rounded hover:bg-slate-100 text-slate-400 hover:text-slate-600">
                            {blog.published ? <EyeOff size={14} /> : <Eye size={14} />}
                          </button>
                          <button onClick={() => startEdit(blog)}
                            className="p-1.5 rounded hover:bg-slate-100 text-slate-400 hover:text-indigo-600">
                            <Pencil size={14} />
                          </button>
                          <button onClick={() => handleDelete(blog.id)}
                            className="p-1.5 rounded hover:bg-slate-100 text-slate-400 hover:text-red-600">
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Editor */}
          <div className={`lg:w-1/2 ${!showForm ? "hidden lg:block" : ""}`}>
            <div className="bg-white rounded-xl border border-slate-200 p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold flex items-center gap-2">
                  <BookOpen size={18} className="text-indigo-600" />
                  {editing ? "Edit Post" : "New Post"}
                </h2>
                <button onClick={resetForm} className="p-1.5 rounded hover:bg-slate-100 text-slate-400">
                  <X size={16} />
                </button>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Title</label>
                  <input value={formTitle}
                    onChange={(e) => { setFormTitle(e.target.value); if (!editing) setFormSlug(generateSlug(e.target.value)); }}
                    placeholder="Blog post title"
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Slug</label>
                  <input value={formSlug}
                    onChange={(e) => setFormSlug(e.target.value)}
                    placeholder="url-friendly-slug"
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Excerpt</label>
                  <input value={formExcerpt}
                    onChange={(e) => setFormExcerpt(e.target.value)}
                    placeholder="Brief description"
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Category</label>
                  <input value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    placeholder="e.g. Career, Education, Productivity"
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Cover Image URL</label>
                  <input value={formCoverImage}
                    onChange={(e) => setFormCoverImage(e.target.value)}
                    placeholder="https://example.com/image.jpg"
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Content (Markdown)</label>
                  <textarea value={formContent}
                    onChange={(e) => setFormContent(e.target.value)}
                    rows={10}
                    placeholder="Write your blog content here. Use ## for headings, **bold**, *italic*"
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none font-mono" />
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" checked={formPublished}
                    onChange={(e) => setFormPublished(e.target.checked)}
                    className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" />
                  <label className="text-sm text-slate-600">Publish immediately</label>
                </div>
                <div className="flex gap-2">
                  <button onClick={handleSave} disabled={saving || !formTitle || !formContent}
                    className="flex-1 flex items-center justify-center gap-1.5 bg-indigo-600 text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-indigo-700 transition disabled:opacity-50">
                    {saving ? <><Loader2 size={14} className="animate-spin" /> Saving...</> : <><Save size={14} /> Save Post</>}
                  </button>
                  <button onClick={resetForm}
                    className="px-4 py-2.5 border border-slate-300 rounded-lg text-sm hover:bg-slate-50">
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
