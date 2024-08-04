import MainLayout from "./layouts/MainLayout";
import Link from "next/link";
export default function NotFound() {
  return (
    <MainLayout>
      <section style={{ textAlign: "center", marginTop: "50px" }}>
        <h1>404 - Page Not Found</h1>
        <p>Sorry, the page you are looking for does not exist.</p>
        <Link href="/" className="text-blue-500">
          Go back home
        </Link>
      </section>
    </MainLayout>
  );
}
