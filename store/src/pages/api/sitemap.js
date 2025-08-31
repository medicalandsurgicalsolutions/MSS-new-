// import BlogServices from "@services/BlogServices";
// import ProductServices from "@services/ProductServices";

// export default async function handler(req, res) {
//   try {
//     const siteUrl = "https://medicalsurgicalsolutions.com";

//     // Fetch blogs and products concurrently using Promise.all
//     const [blogs, productData] = await Promise.all([
//       BlogServices.getAllBlogs().catch((e) => {
//         console.error("Error fetching blogs:", e);
//         return [];
//       }),
//       ProductServices.getProductSitemap().catch((e) => {
//         console.error("Error fetching products:", e);
//         return { products: [] };
//       }),
//     ]);

//     const formatUrl = (path, updatedAt) => `
//       <url>
//         <loc>${siteUrl}${path}</loc>
//         <lastmod>${new Date(updatedAt || new Date()).toISOString()}</lastmod>
//       </url>`;

//     // Generate URLs for blogs and products
//     // Generate URLs for blogs and products
//     const generateRoutes = (items, pathPrefix) => {
//       return items
//         .filter((item) => item.slug)
//         .map((item) =>
//           formatUrl(`/${pathPrefix}/${item.slug}`, item.updatedAt)
//         );
//     };
//     // Static routes
//     const staticRoutes = [
//       { slug: "/about-us" },
//       { slug: "/contact-us" },
//       { slug: "/faq" },
//       { slug: "/awards" },
//       { slug: "/blogs" },
//       { slug: "/terms-and-conditions" },
//       { slug: "/privacy-policy" },
//       { slug: "/exchange-return-policy" },
//     ];

//     const staticRoutesXml = staticRoutes.map((route) =>
//       formatUrl(route.slug, new Date())
//     );
//     const blogRoutes = generateRoutes(blogs, "blog");
//     const productRoutes = generateRoutes(productData.products, "product");

//     // Construct the final sitemap XML
//     const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
//     <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
//       ${formatUrl("", new Date())}
//        ${staticRoutesXml.join("")}
//       ${blogRoutes.join("")}
//       ${productRoutes.join("")}
//     </urlset>`;

//     res.setHeader("Content-Type", "text/xml");
//     res.status(200).send(sitemap);
//   } catch (error) {
//     console.error("Error generating sitemap:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// }
