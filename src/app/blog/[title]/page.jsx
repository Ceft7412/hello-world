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

  const dom = new JSDOM(blog.content);
  const document = dom.window.document;
  const headings = document.querySelectorAll("h1, h2");

  headings.forEach((heading, index) => {
    if (!heading.id) {
      heading.id = `${slugify(heading.textContent)}-${index}`;
    }
  });

  const modifiedContent = document.body.innerHTML;

  const navHeadings = Array.from(headings).map((heading) => ({
    id: heading.id,
    tagName: heading.tagName.toLowerCase(),
    text: heading.textContent,
  }));

  return (
    <MainLayout>
      <div className="flex p-1 sm:w-[80%] xl:pr-[250px]">
        <div className="flex-1">
          <article className="">
            <header className="border-b">
              <h1 className="text-4xl font-bold">{blog.title}</h1>
              <div className="my-4">
                {blog.subcategories.map((cat) => (
                  <span key={cat.id} className="mr-2 text-gray-500">
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

        <aside className="fixed hidden xl:block right-10 w-[350px] ml-8 h-[300px]">
          <BlogNavigation headings={navHeadings} />
        </aside>
      </div>
    </MainLayout>
  );
}
