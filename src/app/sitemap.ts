import { MetadataRoute } from 'next'

export const revalidate = 0 // 1 hour cache

const API_URL = process.env.NEXT_PUBLIC_API_URL || ''
const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://gammingbazaar.com'

/* ---------------------------
   PRODUCTS FETCH
----------------------------*/
async function fetchProducts() {
  try {
    const res = await fetch(`${API_URL}/api/all-products`, {
      cache: 'no-store',
    })

    if (!res.ok) return []

    return res.json()
  } catch {
    return []
  }
}

/* ---------------------------
   BLOGS FETCH
----------------------------*/
async function fetchBlogs() {
  try {
    const res = await fetch(`${API_URL}/api/blogs`, {
    cache: 'no-store',
    })

    if (!res.ok) return []

    return res.json()
  } catch {
    return []
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  /* ---------------------------
     PRODUCTS
  ----------------------------*/
  const productResponse = await fetchProducts()

  const products = Array.isArray(productResponse)
    ? productResponse
    : productResponse?.data || []

  /* ---------------------------
     BLOGS
  ----------------------------*/
  const blogResponse = await fetchBlogs()

  const blogs = Array.isArray(blogResponse)
    ? blogResponse
    : blogResponse?.data || []

  /* ---------------------------
     PRODUCT URLs
  ----------------------------*/
  const productUrls: MetadataRoute.Sitemap = products.map(
    (product: any) => ({
      url: `${BASE_URL}/topup/${product.slug || product.code}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    })
  )

  /* ---------------------------
     BLOG URLs
  ----------------------------*/
  const blogUrls: MetadataRoute.Sitemap = blogs.map(
    (blog: any) => ({
      url: `${BASE_URL}/blogs/${blog.slug}`,
      lastModified: new Date(blog.updated_at || blog.created_at),
      changeFrequency: 'weekly',
      priority: 0.7,
    })
  )

  /* ---------------------------
     STATIC PAGES
  ----------------------------*/
  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${BASE_URL}/topup`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/faq`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/blogs`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },

    ...productUrls,
    ...blogUrls,
  ]
}