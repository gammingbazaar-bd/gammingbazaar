import Link from "next/link";

export default function MoreBlogs({ blogs }: { blogs: any[] }) {
  return (
    <div className="bg-[#0b1224] border border-white/10 rounded-2xl p-5">
      <h3 className="font-bold mb-4">More Blogs</h3>

      <div className="space-y-3">

        {blogs?.slice(0, 5).map((item) => (
          <Link
            key={item.id}
            href={`/blogs/${item.slug}`}
            className="flex gap-3 items-center hover:bg-white/5 p-2 rounded-lg transition"
          >

            <img
              className="w-12 h-12 rounded-lg object-cover"
              src={
                item.cover_banner
                  ? `${process.env.NEXT_PUBLIC_API_URL}/storage/blogs/${item.cover_banner}`
                  : "https://via.placeholder.com/100"
              }
              alt={item.title}
            />

            <div>
              <p className="text-sm font-medium line-clamp-1">
                {item.title}
              </p>
              <p className="text-xs text-gray-400">
                {new Date(item.created_at).toDateString()}
              </p>
            </div>

          </Link>
        ))}

      </div>
    </div>
  );
}