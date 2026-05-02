import Link from "next/link";
import sanitizeHtml from "sanitize-html";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export default function BlogCard({ blog }: any) {

  const imageUrl = blog.blog_image
    ? `${API_URL}/storage/blogs/${blog.blog_image}`
    : "/placeholder.png";

  const cleanDescription = sanitizeHtml(blog.meta_description || "");

  return (
    <Link href={`/blogs/${blog.slug}`} className="block">

      <div className="group bg-[#0b1224]/80 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-xl h-[300px] flex flex-col hover:shadow-pink-500/10 hover:border-pink-500/30 transition-all duration-300 hover:-translate-y-1">

        {/* IMAGE */}
        <div className="relative h-40 overflow-hidden">
          <img
            src={imageUrl}
            alt={blog.title}
            className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-[#070c18] via-[#070c18]/30 to-transparent" />
        </div>

        {/* CONTENT */}
        <div className="p-5 flex-1 flex flex-col space-y-3">

          {/* TITLE */}
          <h2 className="text-lg font-semibold line-clamp-1 group-hover:text-pink-400 transition">
            {blog.title}
          </h2>

          {/* DESCRIPTION */}
          <div
            className="text-gray-300 text-sm line-clamp-2 overflow-hidden"
            dangerouslySetInnerHTML={{
              __html: cleanDescription,
            }}
          />

          {/* FOOTER */}
          <div className="mt-auto flex items-center justify-between pt-3 border-t border-white/10">

            <span className="text-xs text-gray-500">
              {new Date(blog.created_at).toDateString()}
            </span>

            <span className="text-xs px-3 py-1 rounded-full bg-pink-500/10 text-pink-300 border border-pink-500/20">
              Read →
            </span>

          </div>

        </div>

      </div>

    </Link>
  );
}