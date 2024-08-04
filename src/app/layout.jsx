import "@/resources/sass/styles.scss";
import NextTopLoader from "nextjs-toploader";
import Providers from "./provider";

export const metadata = {
  title: "Hello World",
  description:
    "Hello World is a blogging platform built with the intention of sharing knowledge and ideas.",
  keywords: "next.js, react, javascript, web development, blog",
  author: "Cedrick Caceres",
  viewport: "width=device-width, initial-scale=1",
  charset: "UTF-8",
  "og:title": "Hello World",
  "og:description":
    "Hello World is a blogging platform built with the intention of sharing knowledge and ideas.",
  "og:url": "/",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <NextTopLoader color="purple" />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
