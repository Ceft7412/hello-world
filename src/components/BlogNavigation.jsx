"use client";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const BlogNavigation = ({ headings }) => {
  const [activeId, setActiveId] = useState(null);
  const darkTheme = useSelector((state) => state.theme.darkTheme);
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("h2");
      const scrollPosition = window.scrollY + window.innerHeight / 2;
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
                ? "border-l-[3px] border-violet-500 bg-violet-200 text-black"
                : "border-l-[3px] border-gray-500"
            } `}
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
