import { NextResponse } from "next/server"; // Import the NextResponse object to handle HTTP responses in Next.js middleware

export function middleware(request) {
  // Middleware function to handle requests and apply authorization logic

  // Extract cookies from the request headers
  const cookies = request.headers.get("cookie");
  // Parse the cookies into a usable object format
  const cookieObject = parseCookies(cookies);

  // Retrieve the 'role' and 'user' cookies from the parsed cookie object
  const role = cookieObject.role || null; // Default to null if 'role' is not present
  const user = cookieObject.user ? decodeURIComponent(cookieObject.user) : null; // Decode the 'user' cookie if it exists

  // Attempt to parse the 'user' cookie into a JSON object
  let userData = null;
  try {
    userData = user ? JSON.parse(user) : null; // Parse user data if 'user' cookie exists
  } catch (error) {
    // Log an error if JSON parsing fails
    console.error("Failed to parse user cookie:", error);
  }

  // Authorization check
  if (!userData || role !== "admin") {
    // Redirect to the homepage if user is not authenticated or not an admin
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Continue with the request if user is authenticated and has the 'admin' role
  return NextResponse.next();
}

// Helper function to parse cookies from the cookie header
function parseCookies(cookieHeader) {
  const cookies = {}; // Initialize an empty object to store parsed cookies
  if (cookieHeader) {
    // Split the cookie header string by ';' to get individual cookies
    cookieHeader.split(";").forEach((cookie) => {
      // Split each cookie by '=' into name and value
      const [name, ...rest] = cookie.split("=");
      // Store the cookie name and value in the cookies object
      cookies[name.trim()] = rest.join("=").trim();
    });
  }
  // Return the parsed cookies object
  return cookies;
}

export const config = {
  // Define URL paths that this middleware will apply to
  matcher: ["/admin/allblogs", "/admin/newblog"],
};
