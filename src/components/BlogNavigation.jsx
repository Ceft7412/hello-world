"use client";
import { useEffect, useState } from "react";

const BlogNavigation = ({ headings }) => {
  const [activeId, setActiveId] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("h2");
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      console.log(window.scrollY);
      console.log(window.innerHeight);
      let activeSection;
      for (const section of sections) {
        const sectionTop = section.offsetTop;
        if (scrollPosition >= sectionTop) {
          activeSection = section;
        }
      }

      if (activeSection) {
        const activeId = activeSection.id;
        setActiveId(activeId);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav>
      <ul>
        {headings.map((heading) => (
          <li
            key={heading.id}
            className={`p-2 ${
              activeId === heading.id
                ? "border-l-[3px] border-violet-500 bg-violet-200"
                : "border-l-[3px] border-gray-500"
            }`}
          >
            <a
              href={`#${heading.id}`}
              className={`block py-1 ${activeId === heading.id ? "font-bold" : ""}`}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default BlogNavigation;
