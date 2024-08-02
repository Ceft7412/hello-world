import { fetchBlogs } from "@/services/blogService";
import MainLayout from "../../layouts/MainLayout";
import { slugify } from "@/utils/slugify";
import BlogNavigation from "@/components/BlogNavigation";
import { JSDOM } from "jsdom";

export default async function BlogPost({ params }) {
  const { title } = params;
  let blogs = [];

  try {
    blogs = await fetchBlogs();
  } catch (error) {
    console.error("Error fetching blogs:", error);
  }

  const blog = blogs.find((blog) => slugify(blog.title) === title);
  if (!blog) {
    return (
      <MainLayout>
        <section className="text-center">
          <h1 className="text-3xl font-bold">Blog Not Found</h1>
          <p>The blog you are looking for does not exist.</p>
        </section>
      </MainLayout>
    );
  }

  // Add IDs to headings
  const dom = new JSDOM(blog.content);
  const document = dom.window.document;
  console.log(document);
  const headings = document.querySelectorAll("h1, h2");

  headings.forEach((heading, index) => {
    if (!heading.id) {
      heading.id = `${slugify(heading.textContent)}-${index}`;
    }
  });

  const modifiedContent = document.body.innerHTML;

  // Extract headings for navigation
  const navHeadings = Array.from(headings).map((heading) => ({
    id: heading.id,
    tagName: heading.tagName.toLowerCase(),
    text: heading.textContent,
  }));
  console.log(navHeadings);

  return (
    <MainLayout>
      <div className="flex">
        <div className="flex-1 w-[70%]">
          <article className="pl-[150px]">
            <header>
              <h1 className="text-4xl font-bold">{blog.title}</h1>
              <div className="my-4">
                {blog.subcategories.map((cat) => (
                  <span key={cat.id} className="mr-2">
                    {cat.name}
                  </span>
                ))}
              </div>
            </header>
            <section
              id="blog-content"
              className="blog-content"
              dangerouslySetInnerHTML={{ __html: modifiedContent }}
            />
          </article>
        </div>
        <div className="w-[30%]">
          <aside className="fixed right-10 w-[350px] ml-8 h-[300px]">
            <BlogNavigation headings={navHeadings} />
          </aside>
        </div>
      </div>
    </MainLayout>
  );
}
