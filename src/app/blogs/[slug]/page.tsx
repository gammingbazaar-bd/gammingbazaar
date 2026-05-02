import React from "react";
import BlogShareButton from "@/components/BlogShareButton";
import MoreBlogs from "@/components/MoreBlogs";
import { Metadata } from "next"
export async function generateMetadata({ params }: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const apiUrl =
    process.env.NEXT_PUBLIC_API_URL || "https://backend.gammingbazaar.com";

  const res = await fetch(`${apiUrl}/api/blogs`, {
    cache: "no-store",
  });

  const blogs = await res.json();

  const blog = blogs.find((b: any) => b.slug === slug);

  if (!blog) {
    return {
      title: "Blog Not Found",
    };
  }

  return {
    title: blog.meta_title || blog.title,
    description:
      blog.meta_description
        ?.replace(/<[^>]*>/g, "")
        .slice(0, 160),
  };
}



async function getBlog(slug: string) {
    try {
        const apiUrl =
            process.env.NEXT_PUBLIC_API_URL || "https://backend.gammingbazaar.com";

        const res = await fetch(`${apiUrl}/api/blogs/${slug}`, {
            cache: "no-store",
            headers: { Accept: "application/json" },
        });

        if (!res.ok) return null;

        return await res.json();
    } catch {
        return null;
    }
}

// 👇 এখানেই নতুন function
async function getBlogs() {
  const apiUrl =
    process.env.NEXT_PUBLIC_API_URL || "https://backend.gammingbazaar.com";

  const res = await fetch(`${apiUrl}/api/blogs`, {
    cache: "no-store",
    headers: { Accept: "application/json" },
  });

  if (!res.ok) return [];

  return res.json();
}




export default async function BlogDetailsPage({ params }: {
    params: { slug: string };
}) {
    const { slug } = await params;

    const blogs = await getBlogs();

    const blog = blogs.find((b: any) => b.slug === slug);

    const relatedBlogs = blogs?.filter(
    (b: any) => b.slug !== slug
    );

    // ✅ এখানে বসবে
    const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://backend.gammingbazaar.com";

    const coverImage = blog?.cover_banner
        ? `${API_URL}/storage/blogs/${blog.cover_banner}`
        : null;

    const blogImage = blog?.blog_image
        ? `${API_URL}/storage/blogs/${blog.blog_image}`
        : null;

        
    if (!blog) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#070c18] text-white">
                <div className="text-center">
                    <h2 className="text-2xl font-bold">Blog Not Found</h2>
                    <p className="text-gray-400 mt-2">
                        The blog you are looking for does not exist.
                    </p>
                </div>
            </div>
        );
    }

    return (
  <div className="bg-[#070c18] text-white min-h-screen">

    {/* HERO SECTION (FIXED SPACING) */}
    <div className="relative w-full h-[220px] md:h-[320px] overflow-hidden">

  {coverImage && (
    <img
      src={coverImage}
      className="absolute inset-0 w-full h-full object-cover scale-100 brightness-50"
      alt={blog.title}
    />
  )}

  {/* OVERLAY */}
  <div className="absolute inset-0 bg-gradient-to-t from-[#070c18] via-[#070c18]/20 to-[#070c18]/50" />
  <div className="absolute inset-0 bg-black/20" />

  {/* TAGS */}
  <div className="absolute top-5 left-5 flex gap-2">
    <span className="px-3 py-1 text-xs bg-white/10 backdrop-blur-md border border-white/10 rounded-full">
      Blog
    </span>
    <span className="px-3 py-1 text-xs bg-pink-500/20 text-pink-300 rounded-full">
      5 min read
    </span>
  </div>

  {/* TITLE */}
  <div className="absolute bottom-10 w-full px-6 md:px-10 max-w-5xl mx-auto left-0 right-0">

    <h1 className="text-2xl md:text-4xl font-extrabold">
      {blog.title}
    </h1>

    <p className="text-gray-300 mt-3 text-sm">
      {new Date(blog.created_at).toDateString()}
    </p>

  </div>

</div>

    {/* CONTENT SECTION */}
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-10">

      <div className="grid md:grid-cols-12 gap-10">

        {/* MAIN CONTENT */}
        <div className="md:col-span-8">

          <div className="bg-[#0b1224]/70 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-10 shadow-2xl">

            <div
              className="prose prose-invert max-w-none
              prose-headings:text-white
              prose-h1:text-3xl md:prose-h1:text-4xl
              prose-h2:text-2xl
              prose-p:text-gray-300
              prose-p:leading-7
              prose-strong:text-white
              prose-a:text-pink-400
              prose-a:underline"
              dangerouslySetInnerHTML={{
                __html: blog.description,
              }}
            />

          </div>

        </div>

        {/* SIDEBAR (STICKY FIXED) */}
        <div className="md:col-span-4 space-y-6 md:sticky md:top-6 h-fit">

          {/* INFO CARD */}
          <div className="bg-[#0b1224] border border-white/10 rounded-2xl p-5 shadow-lg">
            <h3 className="text-lg font-bold mb-4">Blog Info</h3>

            <p className="text-xs text-gray-400">Published Date</p>
            <p className="mb-3 text-sm">
              {new Date(blog.created_at).toDateString()}
            </p>

            <p className="text-xs text-gray-400">Status</p>
            <span className="text-green-400 font-semibold text-sm">
              {blog.status}
            </span>
          </div>

          {/* SHARE */}
          <div className="bg-gradient-to-r from-pink-500/10 to-blue-500/10 border border-white/10 rounded-2xl p-5">
            <h3 className="font-bold mb-2">Share This Blog</h3>
            <p className="text-sm text-gray-400 mb-3">
              Share with friends
            </p>

            <BlogShareButton title={blog.title} />
            </div>

          {/* MORE BLOGS */}
          <MoreBlogs blogs={relatedBlogs} />

        </div>

      </div>
    </div>
  </div>
);
}