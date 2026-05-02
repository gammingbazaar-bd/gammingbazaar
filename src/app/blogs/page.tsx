export const metadata = {
  title: "All Blogs ~ Read all latest blogs and articles here",
  description: "Read all latest blogs and articles here",
};

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

export default async function BlogsPage() {
  const blogs = (await getBlogs()) ?? [];

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
  <h1 className="text-3xl font-bold mb-8">All Blogs</h1>

  <div className="grid md:grid-cols-3 gap-6">

    {blogs.map((blog: any) => (
      <a
        key={blog.id}
        href={`/blogs/${blog.slug}`}
        className="group bg-[#0b1224] border border-white/10 rounded-2xl overflow-hidden hover:scale-[1.02] transition duration-300"
      >

        {/* IMAGE (IMPORTANT - FIX VISUAL) */}
        <div className="h-40 bg-gray-900 overflow-hidden">
          <img
            src={
              blog.cover_banner
                ? `${process.env.NEXT_PUBLIC_API_URL}/storage/blogs/${blog.cover_banner}`
                : "https://via.placeholder.com/600"
            }
            className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
            alt={blog.title}
          />
        </div>

        {/* CONTENT */}
        <div className="p-4 space-y-2">

          <h2 className="text-lg font-semibold line-clamp-2 group-hover:text-pink-400 transition">
          {blog.title}
          </h2>

          <p className="text-xs text-gray-400">
            {new Date(blog.created_at).toDateString()}
          </p>

          <p className="text-sm text-gray-500 line-clamp-2">
          {blog.description?.replace(/<[^>]*>/g, "")}
          </p>

        </div>

      </a>
    ))}

  </div>
</div>
  );
}